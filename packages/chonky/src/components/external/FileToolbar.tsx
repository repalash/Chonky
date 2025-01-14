import React, { ReactNode, } from 'react';
import { useSelector } from 'react-redux';

import { selectHideToolbarInfo } from '../../redux/selectors';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import Button from '@mui/material/Button';
import RefreshIcon from "../../icons/refresh";

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {
  const { children } = props;
  const classes = useStyles();

  const hideToolbarInfo = useSelector(selectHideToolbarInfo);
  return (
    <div className={classes.toolbarWrapper}>
      <div className={classes.toolbarContainer}>
        <div className={classes.toolbarLeft}>
          {/*<ToolbarSearch />*/}
          <Button startIcon={<RefreshIcon/>}></Button>
          {!hideToolbarInfo && <ToolbarInfo />}
          {children}
        </div>
      </div>
    </div>
  );
});

const useStyles = makeGlobalChonkyStyles(() => ({
  toolbarWrapper: {
    padding: '10px',
    alignItems: 'center',
  },
  toolbarContainer: {
    flexWrap: 'wrap-reverse',
    display: 'flex',
    alignItems: 'center',
  },
  toolbarLeft: {
    // paddingBottom: theme.margins.rootLayoutMargin,
    // flexWrap: 'nowrap',
    // flexGrow: 10000,
    display: 'flex',
  },
  toolbarLeftFiller: {
    flexGrow: 10000,
  }
}));
