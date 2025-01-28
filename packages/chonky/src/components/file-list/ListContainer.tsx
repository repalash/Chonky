/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useContext, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { makeLocalChonkyStyles } from '../../util/styles';
import { SmartFileEntry } from './FileEntry';
import { PropsContext } from '../PropsProvider';

export interface FileListListProps {
  width: number;
  height: number;
}

export const ListContainer: React.FC<FileListListProps> = React.memo((props) => {
  const { width, height } = props;

  const { listCols } = useContext(PropsContext);

  const viewConfig = useSelector(selectFileViewConfig);

  const listRef = useRef<FixedSizeList>();

  const displayFileIds = useSelector(selectors.getDisplayFileIds);
  const displayFileIdsRef = useInstanceVariable(displayFileIds);
  const getItemKey = useCallback(
    (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
    [displayFileIdsRef],
  );

  const classes = useStyles();
  const listComponent = useMemo(() => {
    // When entry size is null, we use List view
    const rowRenderer = (data: { index: number; style: CSSProperties; }) => {
      return (
        <div style={data.style}>
          <SmartFileEntry
            fileId={displayFileIds[data.index] ?? null}
            displayIndex={data.index}
            fileViewMode={FileViewMode.List}
          />
        </div>
      );
    };

    const headerRenderer = () => {
      return (
          <div style={{ display: 'flex', padding: '0 10px', borderBottom: '1px solid #E7E9E9', paddingBottom: '10px' }}>
              <div style={{ flex: '1 1 300px', paddingLeft: '40px', fontWeight: 600 }}>
                  Name
              </div>
              <div style={{ flex: '0 1 150px', paddingLeft: '30px', fontWeight: 600 }}>
                  Date Modified
              </div>
              <div style={{ flex: '0 1 150px', paddingLeft: '12px', fontWeight: 600}}>
                  Size
              </div>
              {
                  listCols?.map((item, i) => (
                      <div key={i} style={{ flex: '0 1 150px' }}>
                          {item.label}
                      </div>
                  ))
              }
          </div>
      );
    };
      return (
          <>
              <FixedSizeList
                  ref={listRef as any}
                  itemSize={viewConfig.entryHeight}
                  height={35}
                  itemCount={1}
                  width={width}
              >
                {headerRenderer}
              </FixedSizeList>
              <FixedSizeList
                  ref={listRef as any}
                  className={classes.listContainer}
                  itemSize={viewConfig.entryHeight}
                  height={height - 20}
                  itemCount={displayFileIds.length}
                  width={width}
                  itemKey={getItemKey}
              >
                  {rowRenderer}
              </FixedSizeList>
          </>
    );
  }, [classes.listContainer, viewConfig.entryHeight, height, displayFileIds, width, getItemKey]);

  return listComponent;
});

const useStyles = makeLocalChonkyStyles(() => ({
  listContainer: {
    // borderTop: `solid 1px ${theme.palette.divider}`,
  },
}));
