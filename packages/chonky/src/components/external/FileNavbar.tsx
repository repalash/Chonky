/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React, { ReactElement, useMemo } from 'react';

import { ChonkyActions } from '../../action-definitions/index';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from "./ToolbarDropdown";
import { useSelector } from "react-redux";
import { selectToolbarItems } from "../../redux/selectors";
import BreadCrumbsSeperator from '../../icons/seperator';

export interface FileNavbarProps { }

export const FileNavbar: React.FC<FileNavbarProps> = React.memo(() => {
  const classes = useStyles();
  const folderChainItems = useFolderChainItems();
  const toolbarItems = useSelector(selectToolbarItems);

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

  const toolbarItemComponents = useMemo(() => {
    const components: ReactElement[] = [];
    // @ts-ignore
    const items = toolbarItems.filter(i => i.name !== 'Actions');

    for (let i = 0; i < items.length; ++i) {
      const item = items[i];

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

  return (
      <Box className={classes.navbarWrapper}>
        <Box className={classes.navbarContainer}>
          {/*<SmartToolbarButton fileActionId={ChonkyActions.OpenParentFolder.id}/>*/}
          <Breadcrumbs className={classes.navbarBreadcrumbs} separator={<BreadCrumbsSeperator/>}>
            {folderChainComponents}
          </Breadcrumbs>
        </Box>
        <Box className={classes.toolbarRight}>{toolbarItemComponents}</Box>
      </Box>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  navbarWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '10px',
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
    flexGrow: 100,
  },
  toolbarRight: {
    paddingBottom: theme.margins.rootLayoutMargin,
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
  },
}));
