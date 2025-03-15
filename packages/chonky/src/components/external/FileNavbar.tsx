/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React, { ReactElement, useMemo, useState, useEffect, useRef } from 'react';
import { important, makeGlobalChonkyStyles, useIsMobileBreakpoint } from '../../util/styles';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import BreadCrumbsSeperator from '../../icons/seperator';
import { SortDropdown } from '../ijewel/SortDropdown';
import ViewDropdown from '../ijewel/ViewDropdown';
import { useSlots } from '../../hooks/useSlots';

export interface FileNavbarProps { }

export const FileNavbar: React.FC<FileNavbarProps> = React.memo(() => {
  const classes = useStyles();
  const folderChainItems = useFolderChainItems();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const isMobileBreakpoint = useIsMobileBreakpoint();
  const { EmptyComponent } = useSlots();

  useEffect(() => {
    setShouldTruncate(folderChainItems.length > 3);
  }, [folderChainItems.length]);

  const folderChainComponents = useMemo(() => {
    const components: ReactElement[] = [];

    if (!shouldTruncate || folderChainItems.length <= 3) {
      for (let i = 0; i < folderChainItems.length; ++i) {
        const key = `folder-chain-${i}`;
        const component = (
          <FolderChainButton
            key={key}
            first={i === 0}
            current={i === folderChainItems.length - 1}
            item={folderChainItems[i]}
          />
        );
        components.push(component);
      }
    } else {
      components.push(
        <FolderChainButton
          key="folder-chain-0"
          first={true}
          current={false}
          item={folderChainItems[0]}
        />
      );

      const truncatedItem = {
        file: null,
        disabled: false,
        onClick: () => {
          // TODO: implement a dropdown to show all hidden items
          // For now, clicking will just expand the full path temporarily
          setShouldTruncate(false);
          setTimeout(() => setShouldTruncate(folderChainItems.length > 3), 5000);
        },
      };

      components.push(
        <FolderChainButton
          key="folder-chain-truncated"
          first={false}
          current={false}
          item={truncatedItem}
          truncated={true}
        />
      );

      components.push(
        <FolderChainButton
          key={`folder-chain-${folderChainItems.length - 1}`}
          first={false}
          current={true}
          item={folderChainItems[folderChainItems.length - 1]}
        />
      );
    }

    return components;
  }, [folderChainItems, shouldTruncate]);

  return (
    <Box className={classes.navbarWrapper}>
      <Box className={classes.navbarContainer} ref={containerRef}>
        <Breadcrumbs className={classes.navbarBreadcrumbs} separator={<BreadCrumbsSeperator />}>
          {folderChainComponents}
        </Breadcrumbs>
      </Box>
      <Box className={classes.controlsContainer}>
        {isMobileBreakpoint ? <>{EmptyComponent && <EmptyComponent />}</> : <><SortDropdown />
          <ViewDropdown /></>}
      </Box>
    </Box>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  navbarWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '15px',
    paddingRight: '16px',
  },
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    overflow: 'hidden',
  },
  upDirectoryButton: {
    fontSize: important(theme.toolbar.fontSize),
    height: theme.toolbar.size,
    width: theme.toolbar.size,
  },
  navbarBreadcrumbs: {
    fontSize: important(theme.toolbar.fontSize),
    flexGrow: 1,
    whiteSpace: 'nowrap',
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
}));
