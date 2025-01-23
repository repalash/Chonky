/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Button from '@mui/material/Button';
import Button2 from '@heroui/button'
import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { ChonkyIconName } from '../../types/icons.types';
import { CustomVisibilityState } from '../../types/action.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { useLocalizedFileActionStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, important, makeGlobalChonkyStyles } from '../../util/styles';
import ToolbarDropdownIcon from '../../icons/toolbardropdown'
import { height } from '@fortawesome/free-solid-svg-icons/faArrowDown';

export interface ToolbarButtonProps {
  className?: string;
  text: string;
  tooltip?: string;
  active?: boolean;
  icon?: Nullable<ChonkyIconName | string>;
  iconOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  dropdown?: boolean;
  folderChain?: boolean;
  fileToolbar?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo((props) => {
  const { className: externalClassName, text, tooltip, active, icon, iconOnly, onClick, disabled, dropdown, folderChain, fileToolbar } = props;
  
  if (disabled && fileToolbar) return null;
  
  const classes = useStyles();
  const ChonkyIcon = useContext(ChonkyIconContext);

  const iconComponent =
    icon || iconOnly ? (
      <div className={iconOnly ? '' : classes.iconWithText}>
        <ChonkyIcon icon={icon ? icon : ChonkyIconName.fallbackIcon} fixedWidth={true} />
      </div>
    ) : null;

  const className = c({
    [externalClassName ?? '']: true,
    [classes.baseButton]: true,
    [classes.iconOnlyButton]: iconOnly,
    [classes.activeButton]: !!active,
    [classes.folderChainButton]: folderChain,
    [classes.fileToolbarButton]: fileToolbar,
  });
  return (
    <Button sx={{ height: '32px' }} variant={"text"} className={className} onClick={onClick} title={tooltip ? tooltip : text} disabled={disabled || !onClick}>
      {iconComponent}
      {text && !iconOnly && <span>{text}</span>}
      {dropdown && text && !iconOnly && (
        <div className={classes.iconDropdown}>
          <ChonkyIcon icon={ChonkyIconName.dropdown} fixedWidth={true} />
        </div>
      )}
    </Button>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  baseButton: {
    fontSize: important(theme.toolbar.fontSize),
    textTransform: important('none'),
    letterSpacing: important(0),
    minWidth: important('auto'),
    lineHeight: theme.toolbar.lineHeight,
    height: theme.toolbar.size,
    paddingBottom: important(0),
    paddingTop: important(0),
    paddingLeft: theme.toolbar.buttonPadding,
    paddingRight: theme.toolbar.buttonPadding,
  },
  iconWithText: {
    marginRight: 8,
  },
  iconOnlyButton: {
    width: theme.toolbar.size,
    textAlign: 'center',
  },
  iconDropdown: {
    fontSize: '0.7em',
    marginLeft: 2,
    marginTop: 1,
  },
  activeButton: {
    // color: important('#373737'),
    // backgroundColor: important(theme.colors.textActive),
  },
  folderChainButton: {
    backgroundColor: important('transparent'),
    fontSize: important('20px'),
    fontWeight: 400,
  },
  fileToolbarButton: {
    backgroundColor: important('#F0F1FF'),
    borderRadius: '30px',
    color: '#373737',
  }
}));

export interface SmartToolbarButtonProps {
  fileActionId: string;
  fileToolbar?: boolean;
}

export const SmartToolbarButton: React.FC<SmartToolbarButtonProps> = React.memo((props) => {
  const { fileActionId, fileToolbar } = props;

  const action = useParamSelector(selectFileActionData, fileActionId);
  const triggerAction = useFileActionTrigger(fileActionId);
  const { icon, active, disabled } = useFileActionProps(fileActionId);
  const { buttonName, buttonTooltip } = useLocalizedFileActionStrings(action);

  if (!action) return null;
  const { button } = action;
  if (!button) return null;
  if (action.customVisibility !== undefined && action.customVisibility() === CustomVisibilityState.Hidden) return null;

  return (
    <ToolbarButton
      text={buttonName}
      tooltip={buttonTooltip}
      icon={icon}
      iconOnly={button.iconOnly}
      active={active}
      onClick={triggerAction}
      disabled={disabled}
      fileToolbar={fileToolbar}
    />
  );
});
