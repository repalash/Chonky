import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import ListViewIcon from '../../icons/listview';
import LargeListViewIcon from '../../icons/largelistview';
import LargeGridViewIcon from '../../icons/largeGridview';
import GridViewIcon from '../../icons/gridview';
import DropdownIcon from '../../icons/dropdown';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ChonkyActions } from '../../action-definitions';
import { useFileActionTrigger } from '../../util/file-actions';
import { FileViewMode } from '../../types/file-view.types';
import { useSelector } from 'react-redux';
import { selectFileViewConfig } from '../../redux/selectors';

export interface ViewDropdownProps { }

export const ViewDropdown: React.FC<ViewDropdownProps> = React.memo(() => {
    const mapViewModeToId = (mode: FileViewMode | null): string => {
        switch (mode) {
            case 'large_grid':
                return 'grid';
            case 'grid':
                return 'titles';
            case 'list':
            default:
                return 'list';
        }
    };

    const viewConfig = useSelector(selectFileViewConfig);
    const activeViewMode = (viewConfig?.mode ?? null) as FileViewMode | null;
    const initialView = mapViewModeToId(activeViewMode);
    const [selectedView, setSelectedView] = useState(initialView);

    useEffect(() => {
        setSelectedView(mapViewModeToId(activeViewMode));
    }, [activeViewMode]);

    const classes = useStyles();

    const triggerListView = useFileActionTrigger(ChonkyActions.EnableListView.id)
    const triggerGridView = useFileActionTrigger(ChonkyActions.EnableGridView.id)
    const triggerLargeGridView = useFileActionTrigger(ChonkyActions.EnableLargeGridView.id)

    const views = [
        { id: 'grid', label: 'Grid', icon: LargeGridViewIcon, action: triggerLargeGridView },
        { id: 'list', label: 'List', icon: ListViewIcon, action: triggerListView },
        // { id: 'large-list', label: 'Large list', icon: LargeListViewIcon, action: triggerListView }, //#TODO: Large list implementation
        { id: 'titles', label: 'Titles', icon: GridViewIcon, action: triggerGridView },
    ];

    const getCurrentIcon = () => {
        const view = views.find(v => v.id === selectedView);
        const Icon = view?.icon || ListViewIcon;
        return <Icon className={classes.icon} />;
    };

    const handleViewClick = (view: { id: string; label: string; icon: any; action: () => void }) => {
        setSelectedView(view.id);
        view.action();
    };

    return (
        <div className={classes.dropdownWrapper}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className={classes.dropdownButton}
                        size="sm"
                    >
                        <div className={classes.buttonContent}>
                            {getCurrentIcon()}
                            <DropdownIcon />
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownSection className={classes.menuContent}>
                        {views.map((view) => {
                            const Icon = view.icon;
                            return (
                                <DropdownItem
                                    key={view.id}
                                    onClick={() => handleViewClick(view)}
                                    className={classes.menuItem}
                                    startContent={<Icon className={classes.icon} />}
                                >
                                    <span className={classes.itemText}>{view.label}</span>
                                </DropdownItem>
                            );
                        })}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
});

const useStyles = makeGlobalChonkyStyles(() => ({
    dropdownWrapper: {
        display: 'flex',
        position: 'relative',
    },
    dropdownButton: {
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
    },
    buttonContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '32px',
        width: '68px'
    },
    icon: {
        width: '20px',
        height: '20px',
        color: '#6b7280',
    },
    menuContent: {
        // padding: '6px',
        width: '180px',
        backgroundColor: '#ffffff',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '180px',
        height: '32px',
        textAlign: 'left',
        fontSize: '14px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    'menuItem:hover': {
        backgroundColor: '#f9fafb',
    },
    itemText: {
        color: '#374151',
        fontWeight: '500',
    }
}));

export default ViewDropdown;