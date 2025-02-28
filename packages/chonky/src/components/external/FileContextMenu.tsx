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
  const classes = useStyles();
  
  // Group items by their nestedGroup property
  const contextMenuItemComponents = useMemo(() => {
    const components: ReactElement[] = [];
    const nestedGroups: Record<string, ReactElement[]> = {};
    const regularActions: ReactElement[] = [];
    const deleteActions: ReactElement[] = [];
    
    for (let i = 0; i < contextMenuItems.length; ++i) {
      const item = contextMenuItems[i];

      if (typeof item === 'string') {
        // Check if this is a delete action
        if (item.includes('delete')) {
          deleteActions.push(
            <SmartToolbarDropdownButton
              key={`context-menu-item-${item}`}
              fileActionId={item}
              onClickFollowUp={hideContextMenu}
            />
          );
        } else {
          // Regular menu item (not in a group and not delete)
          regularActions.push(
            <SmartToolbarDropdownButton
              key={`context-menu-item-${item}`}
              fileActionId={item}
              onClickFollowUp={hideContextMenu}
            />
          );
        }
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
    
    // Add nested groups to the components array first
    Object.entries(nestedGroups).forEach(([groupName, groupItems]) => {
      // Only add groups that have items
      if (groupItems.length > 0) {
        components.push(
          <ContextMenuGroup key={`group-${groupName}`} title={groupName}>
            {groupItems}
          </ContextMenuGroup>
        );
      }
    });
    
    // Add divider after nested groups if any exist and there are regular actions
    if (Object.keys(nestedGroups).length > 0 && regularActions.length > 0) {
      components.push(<Divider key="nested-groups-divider" className={classes.divider} />);
    }
    
    // Add regular actions
    if (regularActions.length > 0) {
      regularActions.forEach(action => components.push(action));
    }
    
    // Add divider before delete actions if any exist and there are other actions
    if (deleteActions.length > 0 && (regularActions.length > 0 || Object.keys(nestedGroups).length > 0)) {
      components.push(<Divider key="delete-divider" className={classes.divider} />);
    }
    
    // Add delete actions
    deleteActions.forEach(action => components.push(action));
    
    return components;
  }, [contextMenuItems, hideContextMenu, classes.divider]);

  const anchorPosition = useMemo(
    () => (contextMenuConfig ? { top: contextMenuConfig.mouseY, left: contextMenuConfig.mouseX } : undefined),
    [contextMenuConfig],
  );

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
