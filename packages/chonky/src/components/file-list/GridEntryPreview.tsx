/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { DndEntryState } from '../../types/file-list.types';
import { ChonkyIconName } from '../../types/icons.types';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, important, makeLocalChonkyStyles } from '../../util/styles';
import { FileThumbnail } from './FileThumbnail';
import { GridEntryDndIndicator } from './GridEntryDndIndicator';
import GridFolderIcon from '../../icons/gridfoldericon'

export type FileEntryState = {
  childrenCount: Nullable<number>;
  color: string;
  icon: ChonkyIconName | string;
  thumbnailUrl: Nullable<string>;
  iconSpin: boolean;
  selected: boolean;
  focused: boolean;
};

export interface FileEntryPreviewProps {
  className?: string;
  entryState: FileEntryState;
  dndState: DndEntryState;
}

export const GridEntryPreviewFolder: React.FC<FileEntryPreviewProps> = React.memo((props) => {
  const { className: externalClassName, entryState, dndState } = props;

  const folderClasses = useFolderStyles(entryState);
  const fileClasses = useFileStyles(entryState);
  const commonClasses = useCommonEntryStyles(entryState);
  const className = c({
    [folderClasses.previewFile]: true,
    [externalClassName || '']: !!externalClassName,
  });
  return (
    <div className={className}>
      <div className={folderClasses.folderContainer}>
        <GridFolderIcon />
        <GridEntryDndIndicator className={fileClasses.dndIndicator} dndState={dndState} />
        <div className={c([fileClasses.fileIcon, folderClasses.fileIcon])}>{entryState.childrenCount}</div>
        <div className={commonClasses.selectionIndicator}></div>
        <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
      </div>
    </div>
  );
});
GridEntryPreviewFolder.displayName = 'GridEntryPreviewFolder';

const useFolderStyles = makeLocalChonkyStyles((theme) => ({
  previewFile: {
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'relative',
    overflow: 'hidden',
    margin: '20px 30px 20px 30px',
  },
  folderContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  fileIcon: {
    fontSize: important(theme.gridFileEntry.childrenCountSize),
    position: 'absolute',
    zIndex: 15,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const GridEntryPreviewFile: React.FC<FileEntryPreviewProps> = React.memo((props) => {
  const { className: externalClassName, entryState, dndState } = props;

  const fileClasses = useFileStyles(entryState);
  const commonClasses = useCommonEntryStyles(entryState);
  const ChonkyIcon = useContext(ChonkyIconContext);
  const className = c({
    [fileClasses.previewFile]: true,
    [externalClassName || '']: !!externalClassName,
  });
  return (
    <div className={className}>
      <GridEntryDndIndicator className={fileClasses.dndIndicator} dndState={dndState} />
      <div className={fileClasses.fileIcon}>
        <ChonkyIcon icon={entryState.icon} spin={entryState.iconSpin} />
      </div>
      <div className={commonClasses.selectionIndicator}></div>
      <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
    </div>
  );
});
GridEntryPreviewFile.displayName = 'GridEntryPreviewFile';

const useFileStyles = makeLocalChonkyStyles((theme) => ({
  previewFile: {
    boxShadow: () => {
      return `inset ${theme.gridFileEntry.fileColorTint} 0 0 0 999px`;
    },
    backgroundColor: (state: FileEntryState) => state.color,
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'relative',
    overflow: 'hidden',
  },
  dndIndicator: {
    zIndex: 14,
  },
  fileIcon: {
    transform: 'translateX(-50%) translateY(-50%)',
    fontSize: theme.gridFileEntry.iconSize,
    opacity: (state: FileEntryState) => (state.thumbnailUrl && !state.focused ? 0 : 1),
    color: (state: FileEntryState) =>
      state.focused ? theme.gridFileEntry.iconColorFocused : theme.gridFileEntry.iconColor,
    position: 'absolute',
    left: '50%',
    zIndex: 12,
    top: '50%',
  },
  thumbnail: {
    borderRadius: theme.gridFileEntry.borderRadius,
    position: 'absolute',
    zIndex: 6,
    bottom: 5,
    right: 5,
    left: 5,
    top: 5,
  },
}));

export const useCommonEntryStyles = makeLocalChonkyStyles(() => ({
  // selectionIndicator: {
  //   display: (state: FileEntryState) => (state.selected ? 'block' : 'none'),
  //   background:
  //     'repeating-linear-gradient(' +
  //     '45deg,' +
  //     'rgba(0,153,255,.14),' +
  //     'rgba(0,153,255,.14) 10px,' +
  //     'rgba(0,153,255,.25) 0,' +
  //     'rgba(0,153,255,.25) 20px' +
  //     ')',
  //   backgroundColor: 'rgba(0, 153, 255, .14)',
  //   position: 'absolute',
  //   height: '100%',
  //   width: '100%',
  //   zIndex: 10,
  // },
  // focusIndicator: {
  //   display: (state: FileEntryState) => (state.focused ? 'block' : 'none'),
  //   boxShadow: 'rgba(0, 0, 0, 1) 0 0 0 2px',
  //   position: 'absolute',
  //   height: '100%',
  //   width: '100%',
  //   zIndex: 11,
  // },
}));
