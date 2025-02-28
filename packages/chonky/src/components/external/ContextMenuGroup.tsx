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
  
  // Add a delay timer ref to prevent immediate opening
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing timer
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    
    // Set a small delay before opening the submenu
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 200); // 200ms delay before opening
  };

  const handleMouseLeave = () => {
    // Clear any pending open timer
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Close the submenu
    setOpen(false);
  };

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

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
        TransitionProps={{ timeout: 100 }}
        slotProps={{ 
          paper: { 
            className: classes.submenuPaper,
            elevation: 1,
            style: { 
              position: 'absolute',
              marginLeft: '8px' // Add some spacing between parent and submenu
            }
          }
        }}
        style={{ pointerEvents: 'none' }} // This ensures the parent menu doesn't capture events
        MenuListProps={{ style: { pointerEvents: 'auto' } }} // But the actual menu list should receive events
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
    zIndex: important(1500), // Ensure it's above the parent menu
  },
  submenuPaper: {
    marginTop: '-8px',
    minWidth: '180px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
})); 