/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { useSlots } from '../../hooks/useSlots';

import EmptyIcon from '../../icons/empty';

export interface FileListEmptyProps {
  width: number;
  height: number;
}

export const FileListEmpty: React.FC<FileListEmptyProps> = (props) => {
  const { width, height } = props;
  const classes = useStyles();
  const { EmptyComponent } = useSlots();
  
  const style: CSSProperties = {
    width,
    height,
  };

  const intl = useIntl();
  const emptyString = intl.formatMessage({
    id: getI18nId(I18nNamespace.FileList, 'nothingToShow'),
    defaultMessage: 'Drop file here or ',
  });

  return (
    <div className={classes.fileListEmpty} style={style}>
      <div className={classes.fileListEmptyContent}>
        <EmptyIcon />
        <div className={classes.fileListEmptyContentText}>
          {emptyString}
        </div>
        <div className={classes.addNewButton}>
        {EmptyComponent && <EmptyComponent />}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeGlobalChonkyStyles(() => ({
  fileListEmpty: {
    // color: theme.palette.text.disabled,
    position: 'relative',
    textAlign: 'center',
    // border: 'solid 1px rgba(0, 0, 0, 0.12)',
    height: '100%',
    width: '100%',
  },
  fileListEmptyContent: {
    transform: 'translateX(-50%) translateY(-50%)',
    position: 'relative',
    left: '50%',
    top: '50%'
  },
  fileListEmptyContentText: {
    position: 'relative',
    paddingTop: '1em',
    fontSize: '20px'
  },
  addNewButton: {
    // position: 'relative',
    marginTop: '10px',
  }
}));
