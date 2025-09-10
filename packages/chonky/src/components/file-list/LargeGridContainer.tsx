/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { VariableSizeGrid } from 'react-window';

import { ChonkyActions } from '../../action-definitions';
import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewConfigGrid } from '../../types/file-view.types';
import { RootState } from '../../types/redux.types';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { makeGlobalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { SmartFileEntry } from './FileEntry';
import { FileHelper } from '../../util/file-helper';

export interface FileListGridProps {
  width: number;
  height: number;
  scrollRef?: React.Ref<VariableSizeGrid>;
}

interface GridConfig {
  rowCount: number;
  columnCount: number;
  gutter: number;
  rowHeight: number;
  columnWidth: number;
}

export const isMobileDevice = () => {
  // noinspection JSDeprecatedSymbols
  return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
};

export const getGridConfig = (
  width: number,
  folderCount: number,
  fileCount: number,
  viewConfig: FileViewConfigGrid,
  isMobileBreakpoint: boolean,
): GridConfig => {
  const gutter = isMobileBreakpoint ? 10 : 20;
  const scrollbar = isMobileDevice() ? 0 : 18;

  let columnCount: number;
  let columnWidth: number;
  if (isMobileBreakpoint) {
    columnCount = 2;
    columnWidth = (width - gutter - scrollbar) / columnCount;
  } else {
    columnCount = 3;
    columnWidth = ((width - (columnCount - 1) * gutter - scrollbar) / columnCount);
    
  }
  const folderRowCount = Math.ceil(folderCount / columnCount);
  const fileRowCount = Math.ceil(fileCount / columnCount);
  const rowCount = folderRowCount + fileRowCount;

  return {
    rowCount,
    columnCount,
    gutter,
    rowHeight: columnWidth,
    columnWidth,
  };
};

export const LargeGridContainer: React.FC<FileListGridProps> = React.memo((props) => {
  const { width, height } = props;
  const viewConfig = useSelector(selectFileViewConfig) as FileViewConfigGrid;
  const displayFileIds = useSelector(selectors.getDisplayFileIds);
  const files = useSelector(selectors.getFileMap);


  const { folders, nonFolders } = useMemo(() => {
    const folders: string[] = [];
    const nonFolders: string[] = [];
    displayFileIds.forEach(fileId => {
      if (fileId && files[fileId] && FileHelper.isDirectory(files[fileId])) {
        folders.push(fileId);
      } else if (fileId) {
        nonFolders.push(fileId);
      }
    });
    return { folders, nonFolders };
  }, [displayFileIds, files]);

  const folderCount = folders.length;
  const fileCount = nonFolders.length;

  const gridRef = useRef<VariableSizeGrid>();

  useEffect(() => {
    if (props.scrollRef) {
      (props.scrollRef as any).current = gridRef.current;
    }
  }, [props.scrollRef, gridRef]);
  const isMobileBreakpoint = useIsMobileBreakpoint();

  // Whenever the grid config changes at runtime, we call a method on the
  // `VariableSizeGrid` handle to reset column width/row height cache.
  // !!! Note that we deliberately update the `gridRef` firsts and update the React
  //     state AFTER that. This is needed to avoid file entries jumping up/down.
  const [gridConfig, setGridConfig] = useState(getGridConfig(width, folderCount, fileCount, viewConfig, isMobileBreakpoint));
  const gridConfigRef = useRef(gridConfig);
  useEffect(() => {
    const oldConf = gridConfigRef.current;
    const newConf = getGridConfig(width, folderCount, fileCount, viewConfig, isMobileBreakpoint);

    gridConfigRef.current = newConf;
    if (gridRef.current) {
      if (oldConf.rowCount !== newConf.rowCount) {
        gridRef.current.resetAfterRowIndex(Math.min(oldConf.rowCount, newConf.rowCount) - 1);
      }
      if (oldConf.columnCount !== newConf.columnCount) {
        gridRef.current.resetAfterColumnIndex(Math.min(oldConf.columnCount, newConf.rowCount) - 1);
      }
      if (oldConf.columnWidth !== newConf.columnWidth) {
        gridRef.current.resetAfterIndices({ columnIndex: 0, rowIndex: 0 });
      }
    }

    setGridConfig(newConf);
  }, [setGridConfig, gridConfigRef, isMobileBreakpoint, width, viewConfig, fileCount]);

  const rowContainsDirectory = useCallback((rowIndex: number): boolean => {
    const folderRowCount = Math.ceil(folders.length / gridConfigRef.current.columnCount);
  return rowIndex < folderRowCount;
}, [folders, gridConfigRef]);

  const sizers = useMemo(() => {
    const gc = gridConfigRef;
    return {
      getColumnWidth: (index: number) =>
        gc.current.columnWidth! + (index === gc.current.columnCount - 1 ? 0 : gc.current.gutter),
      getRowHeight: (rowIndex: number) =>
        {
          const hasDirectory = rowContainsDirectory(rowIndex);
          const baseHeight = hasDirectory ? 190 : gc.current.rowHeight;
          return baseHeight + (rowIndex === gc.current.rowCount - 1 ? 0 : gc.current.gutter);
        },
    };
  }, [gridConfigRef]);

  const foldersRef = useInstanceVariable(folders);
  const nonFoldersRef = useInstanceVariable(nonFolders);
  const getItemKey = useCallback(
    (data: { columnIndex: number; rowIndex: number; data: any }) => {
      const folderRowCount = Math.ceil(foldersRef.current.length / gridConfigRef.current.columnCount);
      const index = data.rowIndex * gridConfigRef.current.columnCount + data.columnIndex;
      if (data.rowIndex < folderRowCount) {
      return foldersRef.current[index] ?? `loading-file-${index}`;
      }
      else{
      const fileIndex = index - (folderRowCount * gridConfigRef.current.columnCount);
      return nonFoldersRef.current[fileIndex] ?? `loading-file-${fileIndex}`;
      }
    },
    [gridConfigRef, foldersRef, nonFoldersRef],
  );

  const cellRenderer = useCallback(
    (data: { rowIndex: number; columnIndex: number; style: CSSProperties }) => {
      const gc = gridConfigRef;
      const folderRowCount = Math.ceil(folders.length / gc.current.columnCount);
      const index = data.rowIndex * gc.current.columnCount + data.columnIndex;
      let fileId: string | undefined;
      if (data.rowIndex < folderRowCount) {
        fileId = folders[index];
      } else {
        const fileIndex = index - (folderRowCount * gc.current.columnCount);
        fileId = nonFolders[fileIndex];
      }
      if (fileId === undefined) return null;

      const styleWithGutter: CSSProperties = {
        ...data.style,
        paddingRight: data.columnIndex === gc.current.columnCount - 1 ? 0 : gc.current.gutter,
        paddingBottom: data.rowIndex === gc.current.rowCount - 1 ? 0 : gc.current.gutter,
        boxSizing: 'border-box',
      };

      return (
        <div style={styleWithGutter}>
          <SmartFileEntry fileId={fileId ?? null} displayIndex={index} fileViewMode={viewConfig.mode} />
        </div>
      );
    },
    [folders, nonFolders, viewConfig.mode],
  );

  const estimatedRowHeight = useMemo(() => {
    const folderRowCount = Math.ceil(folders.length / gridConfig.columnCount);
    const fileRowCount = Math.ceil(nonFolders.length / gridConfig.columnCount);
    let totalHeight = 0;
    let rowCount = 0;
    
    for (let rowIndex = 0; rowIndex < folderRowCount; rowIndex++) {
      totalHeight += 200; 
      rowCount++;
    }
    for (let rowIndex = 0; rowIndex < fileRowCount; rowIndex++) {
      totalHeight += gridConfig.rowHeight;
      rowCount++;
    }
    
    return rowCount > 0 ? totalHeight / rowCount : gridConfig.rowHeight;
  }, [gridConfig.rowCount, gridConfig.rowHeight, folders, nonFolders, rowContainsDirectory]);


  const classes = useStyles();
  const gridComponent = useMemo(() => {
    return (
      <VariableSizeGrid
        ref={gridRef as any}
        className={isMobileBreakpoint ? "" : classes.gridContainer}
        estimatedRowHeight={gridConfig.rowHeight + gridConfig.gutter}
        rowHeight={sizers.getRowHeight}
        estimatedColumnWidth={gridConfig.columnWidth + gridConfig.gutter}
        columnWidth={sizers.getColumnWidth}
        columnCount={gridConfig.columnCount}
        height={height}
        rowCount={gridConfig.rowCount}
        width={isMobileBreakpoint ? (width + 1) : width}
        itemKey={getItemKey}
      >
        {cellRenderer}
      </VariableSizeGrid>
    );
  }, [
    classes.gridContainer,
    gridConfig.rowHeight,
    gridConfig.gutter,
    gridConfig.columnWidth,
    gridConfig.columnCount,
    gridConfig.rowCount,
    sizers.getRowHeight,
    sizers.getColumnWidth,
    height,
    width,
    getItemKey,
    cellRenderer,
    estimatedRowHeight,
    isMobileBreakpoint,
    folders,
    nonFolders
  ]);

  return gridComponent;
});

const useStyles = makeGlobalChonkyStyles(() => ({
  gridContainer: {
    marginLeft: '20px'
  },
}));
