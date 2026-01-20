import React from 'react';
import { FileEntryProps } from '../../types/file-list.types';
import { FileHelper } from '../../util/file-helper';
import { c, makeLocalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { GridEntryPreviewFile, GridEntryPreviewFolder } from './GridEntryPreview';
import { Button } from '@heroui/button';
import FileListDropdownIcon from '../../icons/filelistdropdown'
import { SmartToolbarButton, ToolbarButton } from '../external/ToolbarButton';
import { ChonkyIconName } from '../../types/icons.types';
import { useFileActionTrigger } from '../../util/file-actions';

export const LargeGridEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused, dndState }) => {
  const isDirectory = FileHelper.isDirectory(file);
  const isConfigurator = FileHelper.isConfigurator(file);
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
      <div className={classes.previewContainer}
      
      >
      {(isDirectory || isConfigurator) ? (
        <GridEntryPreviewFolder isConfigurator={isConfigurator} className={classes.gridFolderEntryPreview} largeGrid={true} entryState={entryState} dndState={dndState} />
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
        <FileEntryName className={classes.gridFileEntryName} file={file} list={false} largeGrid={true}/>
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
  "@global": {
    ".chonky-fileEntryClickableWrapper.chonky-selected": {
      borderRadius: "12px !important",
  },
},
  gridFileEntry: {
    height: '100%',
  },
  previewContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    marginBottom: -23
  },
  gridFolderEntryPreview: {
    height: "88%",
    width: "100%",
    margin: 0,
    '& svg': {
      [theme.breakpoints.down('sm')]: {
        width: '170px !important',
        height: '170px !important',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '200px !important',
        height: '200px !important',
      },
      [theme.breakpoints.between('md','lg')]: {
        width: '220px !important',
        height: '220px !important',
      },
      [theme.breakpoints.up('lg')]: {
        width: '240px !important',
        height: '240px !important',
      },
      maxWidth: 'none !important',
      maxHeight: 'none !important',
    },
    '& img': {
      [theme.breakpoints.down('sm')]: {
        width: '170px !important',
        height: '170px !important',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '200px !important',
        height: '200px !important',
      },
      [theme.breakpoints.between('md','lg')]: {
        width: '220px !important',
        height: '220px !important',
      },
      [theme.breakpoints.up('lg')]: {
        width: '240px !important',
        height: '240px !important',
      },
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
      [theme.breakpoints.down('sm')]: {
        width: '170px !important',
        height: '170px !important',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '200px !important',
        height: '200px !important',
      },
      [theme.breakpoints.between('md','lg')]: {
        width: '220px !important',
        height: '220px !important',
      },
      [theme.breakpoints.up('lg')]: {
        width: '240px !important',
        height: '240px !important',
      },
    },
  },
  gridFileEntryPreview: {
    height: "88%",
    border:"1px solid #E8E8E8",
    width: "100%",
    margin: 0,
    padding: 0,
   "& .chonky-fileThumbnail": {
  inset: "0 !important",
  padding: 0,
  backgroundSize: 'cover !important',
}

  },
  hoverIcons: {
    position: 'absolute',
    bottom: '14%', 
    right: '4px', 
    display: 'flex',
    gap: '6px',
    borderRadius: '8px',
    padding: '4px',
    zIndex: 10,
  },
  hoverButton: {
    minWidth: '32px',
    height: '32px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    backgroundColor: 'rgba(240, 241, 255)',
    borderRadius: '50%',
    '& button svg path': {
      fill: 'black !important', 
    },
  },
  gridFileEntryNameContainer: {
    fontSize: theme.gridFileEntry.fontSize,
    wordBreak: 'normal',
    textAlign: 'center',
    height: "12%",
    flexDirection: 'column',
    display: 'flex',
  },
  nameAndActionsContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  gridFileEntryName: {
    borderRadius: 3,
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '2px 0px 2px 6px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  actionButton: {
    zIndex: 21,
    height: '20px',
    minWidth: '20px',
  },
}));
