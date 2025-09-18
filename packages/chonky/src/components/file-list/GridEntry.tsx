import React from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { FileHelper } from '../../util/file-helper';
import { c, makeLocalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, GridEntryPreviewFile, GridEntryPreviewFolder } from './GridEntryPreview';
import { Button } from '@heroui/button';
import FileListDropdownIcon from '../../icons/filelistdropdown'

export const GridEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused, dndState }) => {
  const isDirectory = FileHelper.isDirectory(file);
  const entryState = useFileEntryState(file, selected, focused);
  const isMobileBreakpoint = useIsMobileBreakpoint();

  const classes = useFileEntryStyles(entryState);
  const fileEntryHtmlProps = useFileEntryHtmlProps(file);
  const entryClassName = c({
    [classes.gridFileEntry]: true,
  });
  return (
    <div className={entryClassName} {...fileEntryHtmlProps}>
      {isDirectory ? (
        <GridEntryPreviewFolder largeGrid={false} className={classes.gridFolderEntryPreview} entryState={entryState} dndState={dndState} />
      ) : (
        <GridEntryPreviewFile  largeGrid={false} className={classes.gridFileEntryPreview} entryState={entryState} dndState={dndState} />
      )}
      <div className={classes.gridFileEntryNameContainer}>
        <FileEntryName className={classes.gridFileEntryName} file={file} list={false}/>
        {isMobileBreakpoint &&
          <Button
            className={classes.actionButton}
            startContent={<FileListDropdownIcon />}
            variant="light"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const event = new MouseEvent('contextmenu', {
                bubbles: true,
                clientX: rect.left,
                clientY: rect.top,
              });
              e.currentTarget.dispatchEvent(event);
            }}
          />}
      </div>
    </div>
  );
});
GridEntry.displayName = 'GridEntry';

const useFileEntryStyles = makeLocalChonkyStyles((theme) => ({
  gridFileEntry: {
    // flexDirection: 'column',
    // display: 'flex',
    height: '100%',
    // gap: '10px',
  },
  gridFolderEntryPreview: {
    flexGrow: 1,
    margin: "auto",
  },
  gridFileEntryPreview: {
    flexGrow: 1,
    height: "75%",
    // width: "52px",
    // margin: "auto",
  },
  gridFileEntryNameContainer: {
    fontSize: theme.gridFileEntry.fontSize,
    wordBreak: 'break-word',
    textAlign: 'center',
    // paddingTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    gap: 3.5,
    height: "25%"
  },
  gridFileEntryName: {
    // backgroundColor: (state: FileEntryState) => (state.selected ? 'rgba(0,153,255, .25)' : 'transparent'),
    // textDecoration: (state: FileEntryState) => (state.focused ? 'underline' : 'none'),
    borderRadius: 3,
    padding: [0, 4],
  },
  actionButton: {
    transform: 'translateY(-50%)',
    zIndex: 21,
    height: '20px',
    width: '20px',
  },
}));
