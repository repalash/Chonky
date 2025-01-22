/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

import { selectHiddenFileCount, selectSelectionSize } from '../../redux/selectors';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import ToolbarSelectedIcon from '../../icons/toolbarselected'
import FocusIcon from '../../icons/focus'

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {
  const classes = useStyles();

  // const displayFileIds = useSelector(selectors.getDisplayFileIds);
  const selectionSize = useSelector(selectSelectionSize);
  const hiddenCount = useSelector(selectHiddenFileCount);

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
        {/*{fileCountString}*/}
        {(selectedString || hiddenString) ? (
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
        ) : (
          <span className={classes.extraInfoSpan}>
            <FocusIcon className={classes.selectionIcon} />
          </span>
        )}
      </Typography>
    </div>
  );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
  infoContainer: {
    // height: theme.toolbar.size,
    display: 'flex',
    // border: `1px solid ${theme.palette.divider}`,
    alignItems: 'center',
  },
  infoText: {
    lineHeight: important(theme.toolbar.lineHeight),
    fontSize: important(theme.toolbar.fontSize),
    marginLeft: important(12),
  },
  extraInfoSpan: {
    marginRight: important(10),
    marginLeft: important(10),
    opacity: 0.8,
  },
  selectionSizeText: {
    color: theme.colors.textActive,
  },
  hiddenCountText: {},
  selectionIcon: {
    marginRight: 10,
    verticalAlign: 'middle',
  },
}));
