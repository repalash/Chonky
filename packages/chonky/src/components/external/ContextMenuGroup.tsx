import React, { useState, useRef } from 'react';
import {MenuItem} from '@mui/material';
import {Menu} from '@mui/material';
import {ListItemText} from '@mui/material';
import {ListItemIcon} from '@mui/material';
import { makeGlobalChonkyStyles, important } from '../../util/styles';

import { SVGProps } from "react"
const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path fill='currentColor' d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
)

interface ContextMenuGroupProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const ContextMenuGroup: React.FC<ContextMenuGroupProps> = ({ title, children, icon }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLLIElement>(null);
  const classes = useStyles();
  
  const timerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 300);
  };
  
  const handleSubmenuMouseEnter = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
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
              marginLeft: '8px'
            },
            onMouseEnter: handleSubmenuMouseEnter
          }
        }}
        style={{ pointerEvents: 'none' }}
        MenuListProps={{ 
          style: { pointerEvents: 'auto' },
          className: classes.submenuList
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
    zIndex: important(1500),
  },
  submenuPaper: {
    marginTop: '-8px',
    minWidth: '180px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
  },
  submenuList: {
    paddingTop: important(0),
    paddingBottom: important(0),
  }
})); 