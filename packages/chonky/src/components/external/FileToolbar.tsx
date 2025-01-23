import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectHideToolbarInfo, selectToolbarItems, selectSelectedFiles } from '../../redux/selectors';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import { Button } from '@heroui/button';
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
              <SmartToolbarButton key={key} fileActionId={item} fileToolbar={true} /*fileActionIds={item.fileActionIds} *//>
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
            <Button className={classes.refreshButton} startContent={<RefreshIcon />}/>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
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
    backgroundColor: '#FFFFFF'
  },
  separator: {
    width: '1px',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    height: '24px',
    margin: '0 16px',
  },
  refreshButton: {
    padding: '0px 15px',
    borderRadius: '30px',
    minWidth: '50px',
    height: '32px',
    backgroundColor: '#F0F1FF',
  }
}));
