import React, { useEffect, useRef, useState } from 'react';
import DropdownIcon from '../../icons/dropdown';
import SortbyIcon from '../../icons/sortby';
import CheckIcon from '../../icons/check';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { useFileActionTrigger } from '../../util/file-actions';
import { ChonkyActions } from '../../action-definitions';

export interface SortDropdownProps { }

//TODO: Update sort selection logic
export const SortDropdown: React.FC<SortDropdownProps> = React.memo(() => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('name');
    const [sortOrder, setSortOrder] = useState('ascending');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const triggerSortByName = useFileActionTrigger(ChonkyActions.SortFilesByName.id);
    const triggerSortBySize = useFileActionTrigger(ChonkyActions.SortFilesBySize.id);
    const triggerSortByDate = useFileActionTrigger(ChonkyActions.SortFilesByDate.id);

    const options = [
        { id: 'name', label: 'Name', action: triggerSortByName },
        { id: 'size', label: 'Size', action: triggerSortBySize },
        { id: 'date', label: 'Date modified', action: triggerSortByDate },
        { id: 'type', label: 'Type', action: triggerSortByName } // TODO: Implement sort by type action
    ];

    const handleOptionClick = (option: { id: string; label: string; action: () => void }) => {
        setSelectedOption(option.id);
        option.action();
        setIsOpen(false);
        setSortOrder('ascending'); //reset to default option
    };

    const handleOrderClick = (order: string) => {
        setSortOrder(order);
        const getSelectedOption = options.find(option => option.id === selectedOption);
        if (getSelectedOption) {
            getSelectedOption.action();
        }
        setIsOpen(false);
    };

    return (
        <div className={classes.dropdownWrapper}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={classes.dropdownButton}
            >
                <SortbyIcon/>
                <span className={classes.buttonText}>{`By ${selectedOption}`}</span>
                <div className={classes.iconWrapper}>
                    <DropdownIcon />
                </div>
            </button>

            {isOpen && (
                <div className={classes.dropdownMenu}>
                    <div className={classes.menuContent}>
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                                className={classes.menuItem}
                            >
                                {option.label}
                                {selectedOption === option.id && (
                                    <div className={classes.checkIcon}>
                                        <CheckIcon/>
                                    </div>
                                )}
                            </button>
                        ))}
                        <div className={classes.divider} />
                        <button
                            onClick={() => handleOrderClick('ascending')}
                            className={classes.menuItem}
                        >
                            Ascending
                            {sortOrder === 'ascending' && (
                                <div className={classes.checkIcon}>
                                    <CheckIcon/>
                                </div>
                            )}
                        </button>
                        <button
                            onClick={() => handleOrderClick('descending')}
                            className={classes.menuItem}
                        >
                            Descending
                            {sortOrder === 'descending' && (
                                <div className={classes.checkIcon}>
                                    <CheckIcon/>
                                </div>
                            )}
                        </button>
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
    },
    dropdownButton: {
        textAlign: 'right',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        padding: '0 8px',
        fontSize: '14px',
    },
    iconWrapper: {
        width: '20px',
        height: '20px',
    },
    dropdownMenu: {
        position: 'absolute',
        marginTop: '4px',
        width: '150px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
    },
    menuContent: {
        padding: '4px 0',
    },
    menuItem: {
        width: '100%',
        padding: '8px 16px',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
    },
    checkIcon: {
        padding: '0 8px',
    },
    divider: {
        borderTop: '1px solid #e5e7eb',
        margin: '4px 0',
    }
}));