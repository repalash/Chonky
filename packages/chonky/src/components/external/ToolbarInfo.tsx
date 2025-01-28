/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { useContext, useRef, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

import { selectFileViewConfig, selectHiddenFileCount, selectSelectionSize } from '../../redux/selectors';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import ToolbarSelectedIcon from '../../icons/toolbarselected'
import FocusIcon from '../../icons/focus'
import { PropsContext } from '../PropsProvider';
import { FixedSizeList } from 'react-window';

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {
  const classes = useStyles();

  // const displayFileIds = useSelector(selectors.getDisplayFileIds);
  const selectionSize = useSelector(selectSelectionSize);
  const hiddenCount = useSelector(selectHiddenFileCount);

  const { listCols } = useContext(PropsContext);

  const intl = useIntl();
  // const fileCountString = intl.formatMessage(
  //   {
  //     id: getI18nId(I18nNamespace.Toolbar, 'visibleFileCount'),
  //     defaultMessage: `{fileCount, plural,
  //               =0 {# items}
  //               one {# item}
  //               other {# items}
  //           }`,
  //   },
  //   { fileCount: displayFileIds.length },
  // );
  const selectedString = intl.formatMessage(
    {
      id: getI18nId(I18nNamespace.Toolbar, 'selectedFileCount'),
      defaultMessage: `{fileCount, plural,
                =0 {}
                other {# selected}
            }`,
    },
    { fileCount: selectionSize },
  );
  const hiddenString = intl.formatMessage(
    {
      id: getI18nId(I18nNamespace.Toolbar, 'hiddenFileCount'),
      defaultMessage: `{fileCount, plural,
                =0 {}
                other {# hidden}
            }`,
    },
    { fileCount: hiddenCount },
  );

  return (
      <div className={classes.infoContainer}>
        <Typography className={classes.infoText} variant="body1">
          {(selectedString || hiddenString) && (
            <span className={classes.extraInfoSpan}>
              {selectedString && (
                <>
                  <ToolbarSelectedIcon className={classes.selectionIcon} />
                  {selectedString}
                </>
              )}
              {selectedString && hiddenString && ', '}
              {hiddenString && (
                <span className={classes.hiddenCountText}>{hiddenString}</span>
              )}
            </span>
          )}
        </Typography>
      </div>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  infoText: {
    lineHeight: important(theme.toolbar.lineHeight),
    fontSize: important(theme.toolbar.fontSize),
    marginLeft: important(12),
  },
  extraInfoSpan: {
    marginRight: important(8),
    marginLeft: important(10),
    opacity: 0.8,
    fontWeight: 600,
    alignItems: 'center',
    display: 'flex',
  },
  selectionSizeText: {
    color: theme.colors.textActive,
  },
  hiddenCountText: {},
  selectionIcon: {
    marginRight: 10,
    alignItems: 'center',
  },
  separator: {
    width: '1px',
    backgroundColor: 'rgba(217, 217, 217, 1)',
    height: '24px',
    margin: '0 16px',
  },
}));
