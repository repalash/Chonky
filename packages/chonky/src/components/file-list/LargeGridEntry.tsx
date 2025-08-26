import React, { useState } from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { FileHelper } from '../../util/file-helper';
import { c, makeLocalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, GridEntryPreviewFile, GridEntryPreviewFolder } from './GridEntryPreview';
import { Button } from '@heroui/button';
import FileListDropdownIcon from '../../icons/filelistdropdown'
import Share from '../../icons/share'
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SmartToolbarDropdownButton } from '../external/ToolbarDropdownButton';
import { SmartToolbarButton, ToolbarButton } from '../external/ToolbarButton';
import { ChonkyIconName } from '../../types/icons.types';
import { useFileActionTrigger } from '../../util/file-actions';
import { color } from 'framer-motion';

export const LargeGridEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused, dndState }) => {
  const isDirectory = FileHelper.isDirectory(file);
  const entryState = useFileEntryState(file, selected, focused);
  const isMobileBreakpoint = useIsMobileBreakpoint();

  const classes = useFileEntryStyles(entryState);
  const fileEntryHtmlProps = useFileEntryHtmlProps(file);
  const entryClassName = c({
    [classes.gridFileEntry]: true,
  });

    const triggerAction = useFileActionTrigger('edit');
  return (
    <div className={entryClassName} {...fileEntryHtmlProps}
    >
      <div className={classes.previewContainer}>
      {isDirectory ? (
        <GridEntryPreviewFolder className={classes.gridFolderEntryPreview} largeGrid={true} entryState={entryState} dndState={dndState} />
      ) : (
        <GridEntryPreviewFile className={classes.gridFileEntryPreview} largeGrid={true} entryState={entryState} dndState={dndState} />
      )}
      {selected && !isDirectory && (
          <div className={classes.hoverIcons}>
            <div
              className={classes.hoverButton}
              onClick={(e) => e.stopPropagation()}
            >
              <span><ToolbarButton text="" icon={ChonkyIconName.pencil} iconOnly onClick={triggerAction} /></span> 
            </div>
            <div
              className={classes.hoverButton}
              onClick={(e) => e.stopPropagation()}
            >
              <span><SmartToolbarButton fileActionId='share'/></span> 
            </div>
          </div>
        )}
      </div>
      <div className={classes.gridFileEntryNameContainer}>
        <div className={classes.nameAndActionsContainer}>
        <FileEntryName className={classes.gridFileEntryName} file={file} list={false}/>
        {isMobileBreakpoint && <div>
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
          />
        </div>}
      </div>
      </div>
    </div>
  );
});
LargeGridEntry.displayName = 'LargeGridEntry';

const useFileEntryStyles = makeLocalChonkyStyles((theme) => ({
  gridFileEntry: {
    // flexDirection: 'column',
    // display: 'flex',
    height: '100%',
    // gap: '10px',
  },
  previewContainer: {
    position: 'relative',
    height: '88%',
    width: '100%',
  },
  gridFolderEntryPreview: {
    height:"100%",
    width:"100%",
    flexGrow: 1,
    margin: "auto",
    '& svg': {
      width: '120px !important',
      height: '120px !important',
      maxWidth: 'none !important',
      maxHeight: 'none !important',
    },
    '& img': {
      width: '120px !important',
      height: '120px !important',
      maxWidth: 'none !important',
      maxHeight: 'none !important',
      objectFit: 'contain !important',
    },
    '& > div': {
      width: '100% !important',
      height: '100% !important',
      display: 'flex !important',
      alignItems: 'center !important',
      justifyContent: 'center !important',
    },
    '& > div > *': {
      width: '120px !important',
      height: '120px !important',
    },
  },
  gridFileEntryPreview: {
    flexGrow: 1,
    height: "88%",
    border:"1px solid #E8E8E8",
    width: "100%",
    margin: "auto",
  },
  hoverIcons: {
    position: 'absolute',
    bottom: '28px', 
    right: '8px', 
    display: 'flex',
    gap: '8px',
    borderRadius: '8px',
    padding: '4px',
    zIndex: 10,
  },
  hoverButton: {
    minWidth: '32px',
    height: '32px',
    padding: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '& button svg path': {
      fill: 'black !important', 
    },
  },
  gridFileEntryNameContainer: {
    fontSize: theme.gridFileEntry.fontSize,
    wordBreak: 'break-word',
    textAlign: 'center',
    height: "12%",
    // paddingTop: 5,
    flexDirection: 'column',
    display: 'flex',
    gap: 5,
  },
  nameAndActionsContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  gridFileEntryName: {
    // backgroundColor: (state: FileEntryState) => (state.selected ? 'rgba(0,153,255, .25)' : 'transparent'),
    // textDecoration: (state: FileEntryState) => (state.focused ? 'underline' : 'none'),
    borderRadius: 3,
    padding: [2, 4],
    flex: 1,
  },
  actionButton: {
    zIndex: 21,
    height: '20px',
    minWidth: '20px',
  },
}));
