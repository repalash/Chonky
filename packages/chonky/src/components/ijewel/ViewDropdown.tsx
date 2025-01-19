import React, { useState } from 'react';
import ListViewIcon from '../../icons/listview';
import LargeListViewIcon from '../../icons/largelistview';
import GridViewIcon from '../../icons/gridview';
import DropdownIcon from '../../icons/dropdown';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { ChonkyActions } from '../../action-definitions';
import { useFileActionTrigger } from '../../util/file-actions';


export interface ViewDropdownProps { }

export const ViewDropdown: React.FC<ViewDropdownProps> = React.memo(() => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('list');

    const triggerListView = useFileActionTrigger(ChonkyActions.EnableListView.id)
    const triggerGridView = useFileActionTrigger(ChonkyActions.EnableGridView.id)

    const views = [
        { id: 'list', label: 'List', icon: ListViewIcon, action: triggerListView },
        { id: 'large-list', label: 'Large list', icon: LargeListViewIcon, action: triggerListView }, //#TODO: Large list implementation
        { id: 'titles', label: 'Titles', icon: GridViewIcon, action: triggerGridView },
    ];

    const getCurrentIcon = () => {
        const view = views.find(v => v.id === selectedView);
        const Icon = view?.icon || ListViewIcon;
        return <Icon className={classes.icon} />;
    };

    const handleViewClick = (view: { id: string; label: string; icon: any; action: () => void}) => {
        setSelectedView(view.id);
        view.action()
        setIsOpen(false);
    };

    return (
        <div className={classes.dropdownWrapper}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={classes.dropdownButton}
            >
                {getCurrentIcon()}
                <div className={classes.iconWrapper}>
                    <DropdownIcon />
                </div>
            </button>

            {isOpen && (
                <div className={classes.dropdownMenu}>
                    <div className={classes.menuContent}>
                        {views.map((view) => {
                            const Icon = view.icon;
                            return (
                                <button
                                    key={view.id}
                                    onClick={() => handleViewClick(view)}
                                    className={classes.menuItem}
                                >
                                    <Icon className={classes.icon} />
                                    <span className={classes.itemText}>{view.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
});

const useStyles = makeGlobalChonkyStyles(() => ({
    dropdownWrapper: {
        display: 'flex',
        position: 'relative',
        width: '150px',
        justifyContent: 'flex-end',
    },
    dropdownButton: {
        textAlign: 'left',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: '14px',
        color: '#4b5563'
    },
    iconWrapper: {
        width: '20px',
        height: '20px',
        marginLeft: 'auto'
    },
    icon: {
        width: '20px',
        height: '20px'
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        marginTop: '4px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 10
    },
    menuContent: {
        padding: '4px 0',
        width: '150px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '8px 16px',
        textAlign: 'left',
        fontSize: '14px',
    },
    itemText: {
        color: '#4b5563'
    }
}));

export default ViewDropdown;