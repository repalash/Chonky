/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties } from 'react';
import { useIntl } from 'react-intl';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { makeGlobalChonkyStyles } from '../../util/styles';

import EmptyIcon from '../../icons/empty';
import Button from "@mui/material/Button";
import PlusIcon from '../../icons/plus';

export interface FileListEmptyProps {
  width: number;
  height: number;
}

export const FileListEmpty: React.FC<FileListEmptyProps> = (props) => {
  const { width, height } = props;
  const classes = useStyles();
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
        <div>
          <Button className={classes.addNewButton} startIcon={<PlusIcon/>} color="inherit">Add new</Button>
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
    borderRadius: '30px',
    marginTop: '25px',
    height: '32px',
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '128px',
    gap: '5px',
    boxShadow: '0 4px 4px rgb(0 0 0 / 0.07)',
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px transparent',
    textTransform: 'none',
  }
}));
