import React, { useContext, useMemo } from 'react';

import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import { useDndIcon, useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';
import SelectedIndicator from '../../icons/fileselectedindicator'
import FocusIndicator from '../../icons/focus';
import ListFolderIcon from '../../icons/listfoldericon'

import { format } from 'date-fns';
import { PropsContext } from '../PropsProvider';

interface StyleState {
  entryState: FileEntryState;
  dndState: DndEntryState;
}

export const ListEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused, dndState }) => {
  const entryState: FileEntryState = useFileEntryState(file, selected, focused);
  const dndIconName = useDndIcon(dndState);
  const { fileModDateString, fileSizeString } = useLocalizedFileEntryStrings(file);
  const styleState = useMemo<StyleState>(
    () => ({
      entryState,
      dndState,
    }),
    [dndState, entryState],
  );
  const classes = useStyles(styleState);
  const commonClasses = useCommonEntryStyles(entryState);
  const ChonkyIcon = useContext(ChonkyIconContext);
  const fileEntryHtmlProps = useFileEntryHtmlProps(file);
  const { listCols } = useContext(PropsContext);

  const fileModDate = typeof file?.modDate === 'string' ? format(new Date(file.modDate), 'MMM dd, yyyy HH:mm') : '-';

  return (
    <div className={classes.listFileEntry} {...fileEntryHtmlProps}>
      <div className={classes.indicatorContainer}>
        {focused && <FocusIndicator className={classes.focusIndicator} />}
        {selected && <SelectedIndicator className={classes.selectedIndicator} />}
      </div>
      <div className={classes.listFileEntryIcon}>
        {file?.isDir ? (
          <ListFolderIcon />
        ) : (
          <ChonkyIcon className={classes.chonkyIcon}
            icon={dndIconName ?? entryState.icon}
            spin={dndIconName ? false : entryState.iconSpin}
            fixedWidth={true}
          />
        )}
      </div>
      <div className={classes.listFileEntryName} title={file ? file.name : undefined}>
        <FileEntryName file={file} />
      </div>
      <div className={classes.listFileEntryProperty}>
        {file ? fileModDate ?? <span>—</span> : <TextPlaceholder minLength={5} maxLength={15} />}
      </div>
      <div className={classes.listFileEntryProperty}>
        {file ? fileSizeString ?? <span>—</span> : <TextPlaceholder minLength={10} maxLength={20} />}
      </div>
      {
        listCols?.map((entry, index) => (
          <div key={index} className={classes.listFileEntryProperty}>
            {entry.getValue(file) ?? '-'}
          </div>
        ))
      }
    </div>
  );
});

const useStyles = makeLocalChonkyStyles((theme) => ({
  selectedIndicator: {
    width: 16,
    height: 16,
    marginRight: 4,
    position: 'absolute',
  },
  listFileEntry: {
    // boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
    fontSize: theme.listFileEntry.fontSize,
    color: ({ dndState }: StyleState) =>
      dndState.dndIsOver ? (dndState.dndCanDrop ? theme.dnd.canDropColor : theme.dnd.cannotDropColor) : 'inherit',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
    height: '100%',
    marginLeft: '30px'
  },
  listFileEntrySelection: {
    opacity: 0.6,
    //backgroundColor: theme.palette.primary.main,
  },
  listFileEntryIcon: {
    color: ({ entryState, dndState }: StyleState) =>
      dndState.dndIsOver
        ? dndState.dndCanDrop
          ? theme.dnd.canDropColor
          : theme.dnd.cannotDropColor
        : entryState.color,
    fontSize: theme.listFileEntry.iconFontSize,
    boxSizing: 'border-box',
    padding: [2, 4],
    zIndex: 20,
  },
  listFileEntryName: {
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: '1 1 300px',
    paddingLeft: 4,
    zIndex: 20,
  },
  listFileEntryProperty: {
    fontSize: theme.listFileEntry.propertyFontSize,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: '0 1 150px',
    padding: [2, 8],
    zIndex: 20,
  },
  focusIndicator: {
    width: 16,
    height: 16,
    marginRight: 4,
    position: 'absolute',
  },
  indicatorContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 24,
    minWidth: 24,
    zIndex: 20,
    position: 'relative',
  },
}));
