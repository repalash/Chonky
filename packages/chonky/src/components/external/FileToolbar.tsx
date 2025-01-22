import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectHideToolbarInfo, selectToolbarItems, selectSelectedFiles } from '../../redux/selectors';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import Button from '@mui/material/Button';
import RefreshIcon from "../../icons/refresh";
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {
  const { children } = props;
  const classes = useStyles();
  const toolbarItems = useSelector(selectToolbarItems);
  const selectedFiles = useSelector(selectSelectedFiles);
  const hasSelection = selectedFiles.length > 0;

  const toolbarItemComponents = useMemo(() => {
    const components: ReactElement[] = [];

    for (let i = 0; i < toolbarItems.length; ++i) {
      const item = toolbarItems[i];

      const key = `toolbar-item-${typeof item === 'string' ? item : item.name}`;
      const component =
          typeof item === 'string' ? (
              <SmartToolbarButton key={key} fileActionId={item} /*fileActionIds={item.fileActionIds} *//>
          ) : (
              <ToolbarDropdown key={key} {...item} />
          );
      components.push(component);
    }
    return components;
  }, [toolbarItems]);

  const hideToolbarInfo = useSelector(selectHideToolbarInfo);

  return (
    <div className={classes.toolbarWrapper}>
      <div className={classes.toolbarContainer}>
        <div className={classes.toolbarTop}>
          <div className={classes.toolbarLeft}>
            <Button className={classes.refreshButton} startIcon={<RefreshIcon />} sx={{
              '& .MuiButton-startIcon': {
                backgroundColor: 'rgba(240, 241, 255, 1)',
                borderRadius: '30px',
                padding: '11px 15px 11px 15px',
              }
            }}></Button>
          </div>
          {hasSelection && (
            <>
              <div className={classes.separator} />
              <div className={classes.toolbarRight}>{toolbarItemComponents}</div>
            </>
          )}
        </div>
        <div className={classes.toolbarBottom}>
          {!hideToolbarInfo && <ToolbarInfo />}
          {children}
        </div>
      </div>
    </div>
  );
});

const useStyles = makeGlobalChonkyStyles(() => ({
  toolbarWrapper: {
    alignItems: 'center',
  },
  toolbarContainer: {
    flexWrap: 'wrap-reverse',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarLeftFiller: {
    flexGrow: 10000,
  },
  toolbarRight: {
    // paddingBottom: theme.margins.rootLayoutMargin,
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
  },
  toolbarBottom: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    height: '3.5rem',
    borderBottom: '1px solid rgba(231, 233, 233, 1)',
    paddingLeft: '0.4rem',
  },
  toolbarTop: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '48px',
    padding: '0 16px',
    backgroundColor: '#FFFFFF',
    // borderBottom: '1px solid rgba(231, 233, 233, 1)',
  },
  separator: {
    width: '1px',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    height: '24px',
    margin: '0 16px',
  },
  refreshButton: {
    minWidth: '40px',
    padding: '8px',
  }
}));
