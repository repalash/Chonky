import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectHideToolbarInfo, selectToolbarItems, selectSelectedFiles } from '../../redux/selectors';
import { makeGlobalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import { Button } from '@heroui/button';
import RefreshIcon from "../../icons/refresh";
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { SortDropdown } from '../ijewel/SortDropdown';
import ViewDropdown from '../ijewel/ViewDropdown';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps & { children?: ReactNode; }> = React.memo((props) => {
  const { children } = props;
  const isMobileBreakpoint = useIsMobileBreakpoint();
  const classes = useStyles(isMobileBreakpoint);
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
          <SmartToolbarButton key={key} fileActionId={item} fileToolbar={true} /*fileActionIds={item.fileActionIds} */ />
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
            {!hideToolbarInfo && !isMobileBreakpoint && <ToolbarInfo />}
            {children}
            {/* <Button className={classes.refreshButton} startContent={<RefreshIcon />} /> */}
          </div>
          {hasSelection && (
            <>
              {/* <div className={classes.separator} /> */}
              <div className={classes.toolbarRight}>{toolbarItemComponents}</div>
            </>
          )}
        </div>
        {isMobileBreakpoint && <div className={classes.toolbarTop2}>
          <div className={classes.toolbarLeft}>
            {!hideToolbarInfo && <ToolbarInfo />}
          </div>
          <div className={hideToolbarInfo ? classes.toolbarRight2 : classes.toolbarRight}>
            <div>{!hasSelection && <SortDropdown />}</div>
            <ViewDropdown />
          </div>
        </div>}
      </div>
    </div>
  );
});

const useStyles = makeGlobalChonkyStyles(() => ({
  toolbarWrapper: {
    alignItems: 'center',
    borderBottom: '1px solid #E7E9E9',
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
  toolbarRight2: {
    // paddingBottom: theme.margins.rootLayoutMargin,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    width: '100%',
  },
  toolbarTop: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '48px',
    backgroundColor: '#FFFFFF',
    padding: '0 16px',
    overflow: 'hidden',
    //wrap
    flexWrap: 'wrap',
  },
  toolbarTop2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '48px',
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
    marginLeft: '10px',
  }
}));
