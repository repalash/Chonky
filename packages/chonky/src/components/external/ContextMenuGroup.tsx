import React, { useState, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeGlobalChonkyStyles, important } from '../../util/styles';

interface ContextMenuGroupProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({ title, children, icon }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLLIElement>(null);
  const classes = useStyles();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div className={classes.groupContainer} onMouseLeave={handleMouseLeave}>
      <MenuItem 
        ref={anchorRef}
        onMouseEnter={handleMouseEnter}
        className={classes.groupMenuItem}
      >
        {icon && (
          <ListItemIcon className={classes.menuIcon}>
            {icon}
          </ListItemIcon>
        )}
        <ListItemText 
          primary={title} 
          primaryTypographyProps={{ className: classes.menuItemText }}
        />
        <ChevronRightIcon className={classes.chevronIcon} fontSize="small" />
      </MenuItem>
      <Menu
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setOpen(false)}
        disableAutoFocusItem
        className={classes.submenu}
        elevation={1}
        TransitionProps={{ timeout: 150 }}
        slotProps={{ 
          paper: { 
            className: classes.submenuPaper,
            elevation: 1 
          }
        }}
      >
        {children}
      </Menu>
    </div>
  );
};

const useStyles = makeGlobalChonkyStyles((theme) => ({
  groupContainer: {
    position: 'relative',
  },
  groupMenuItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: important('8px 16px'),
    height: important(theme.toolbar.size),
    minHeight: important('auto'),
    lineHeight: important(theme.toolbar.lineHeight),
  },
  menuItemText: {
    fontSize: important(theme.toolbar.fontSize),
    fontWeight: 400,
    color: '#374151',
  },
  menuIcon: {
    minWidth: important('24px'),
    marginRight: important('12px'),
    color: '#6B7280',
    fontSize: important(theme.toolbar.fontSize),
  },
  chevronIcon: {
    marginLeft: 'auto',
    color: '#6B7280',
    fontSize: '18px',
  },
  submenu: {
    pointerEvents: 'auto',
  },
  submenuPaper: {
    marginTop: '-8px',
    minWidth: '180px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
})); 