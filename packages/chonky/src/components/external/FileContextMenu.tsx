/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

import { reduxActions } from '../../redux/reducers';
import { selectContextMenuConfig, selectContextMenuItems } from '../../redux/selectors';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import { useContextMenuDismisser } from './FileContextMenu-hooks';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';
import { ChonkyDispatch } from '../../types/redux.types';
import { ContextMenuGroup } from './ContextMenuGroup';
import { FileActionGroup } from '../../types/action-menus.types';

export interface FileContextMenuProps { }

export const FileContextMenu: React.FC<FileContextMenuProps> = React.memo(() => {
  const dispatch: ChonkyDispatch = useDispatch();
  useEffect(() => {
    dispatch(reduxActions.setContextMenuMounted(true));
    return () => {
      dispatch(reduxActions.setContextMenuMounted(false));
    };
  }, [dispatch]);

  const contextMenuConfig = useSelector(selectContextMenuConfig);
  const contextMenuItems = useSelector(selectContextMenuItems);

  const hideContextMenu = useContextMenuDismisser();
  
  // Group items by their nestedGroup property
  const contextMenuItemComponents = useMemo(() => {
    const components: ReactElement[] = [];
    const nestedGroups: Record<string, ReactElement[]> = {};
    
    for (let i = 0; i < contextMenuItems.length; ++i) {
      const item = contextMenuItems[i];

      if (typeof item === 'string') {
        // Regular menu item (not in a group)
        components.push(
          <SmartToolbarDropdownButton
            key={`context-menu-item-${item}`}
            fileActionId={item}
            onClickFollowUp={hideContextMenu}
          />
        );
      } else {
        // This is a group
        const groupName = item.name;
        
        // Create array for this group if it doesn't exist
        if (!nestedGroups[groupName]) {
          nestedGroups[groupName] = [];
        }
        
        // Add all actions from this group to the appropriate nested group
        item.fileActionIds.forEach(id => {
          nestedGroups[groupName].push(
            <SmartToolbarDropdownButton
              key={`context-menu-item-${groupName}-${id}`}
              fileActionId={id}
              onClickFollowUp={hideContextMenu}
            />
          );
        });
      }
    }
    
    // Add nested groups to the components array
    Object.entries(nestedGroups).forEach(([groupName, groupItems]) => {
      components.push(
        <ContextMenuGroup key={`group-${groupName}`} title={groupName}>
          {groupItems}
        </ContextMenuGroup>
      );
    });
    
    return components;
  }, [contextMenuItems, hideContextMenu]);

  const anchorPosition = useMemo(
    () => (contextMenuConfig ? { top: contextMenuConfig.mouseY, left: contextMenuConfig.mouseX } : undefined),
    [contextMenuConfig],
  );

  const classes = useStyles();
  return (
    <Menu
      elevation={1}
      disablePortal
      onClose={hideContextMenu}
      transitionDuration={150}
      open={!!contextMenuConfig}
      anchorPosition={anchorPosition}
      anchorReference="anchorPosition"
      classes={{ list: classes.contextMenuList }}
      PaperProps={{ 
        className: classes.menuPaper,
        elevation: 1
      }}
    >
      {contextMenuItemComponents}
    </Menu>
  );
});

const useStyles = makeGlobalChonkyStyles(() => ({
  contextMenuList: {
    paddingBottom: important(0),
    paddingTop: important(0),
  },
  menuPaper: {
    borderRadius: '8px',
    minWidth: '180px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  divider: {
    margin: '4px 0',
  },
  browserMenuTooltip: {
    lineHeight: important('30px'),
    fontSize: important('0.7em'),
    color: '#6B7280',
    padding: '0 16px',
  },
}));
