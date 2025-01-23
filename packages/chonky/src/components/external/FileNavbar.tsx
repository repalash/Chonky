/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React, { ReactElement, useMemo } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@heroui/dropdown";
import { Button }from "@heroui/button"
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import BreadCrumbsSeperator from '../../icons/seperator';
import { SortDropdown } from '../ijewel/SortDropdown';
import ViewDropdown from '../ijewel/ViewDropdown';

export interface FileNavbarProps { }

export const FileNavbar: React.FC<FileNavbarProps> = React.memo(() => {
  const classes = useStyles();
  const folderChainItems = useFolderChainItems();

  const folderChainComponents = useMemo(() => {
    const components: ReactElement[] = [];
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
    return components;
  }, [folderChainItems]);

  return (
    <Box className={classes.navbarWrapper}>
      <Box className={classes.navbarContainer}>
        <Breadcrumbs className={classes.navbarBreadcrumbs} separator={<BreadCrumbsSeperator/>}>
          {folderChainComponents}
        </Breadcrumbs>
      </Box>
      <Box className={classes.controlsContainer}>
        <SortDropdown/>
        <ViewDropdown/>
      </Box>
    </Box>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  navbarWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '5px',
    paddingBottom: '15px',
    // borderBottom: '1px solid $gray'
  },
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  upDirectoryButton: {
    fontSize: important(theme.toolbar.fontSize),
    height: theme.toolbar.size,
    width: theme.toolbar.size,
  },
  navbarBreadcrumbs: {
    fontSize: important(theme.toolbar.fontSize),
    flexGrow: 1,
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
}));
