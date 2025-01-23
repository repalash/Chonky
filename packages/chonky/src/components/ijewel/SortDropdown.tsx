import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import SortbyIcon from '../../icons/sortby';
import DropdownIcon from '../../icons/dropdown';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { useFileActionTrigger } from '../../util/file-actions';
import { ChonkyActions } from '../../action-definitions';

export interface SortDropdownProps { }

//TODO: Update sort selection logic
export const SortDropdown: React.FC<SortDropdownProps> = React.memo(() => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState('name');
    const [sortOrder, setSortOrder] = useState('ascending');

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
        setSortOrder('ascending'); //reset to default option
    };

    const handleOrderClick = (order: string) => {
        setSortOrder(order);
        const getSelectedOption = options.find(option => option.id === selectedOption);
        if (getSelectedOption) {
            getSelectedOption.action();
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button 
                    variant="light"
                    className={classes.dropdownButton}
                    size={'sm'}
                >
                    <div className={classes.sortButtonContent}>
                        <SortbyIcon/>
                        <span className={classes.buttonText}>{`By ${selectedOption}`}</span>
                        <DropdownIcon/>
                    </div>
                </Button>
            </DropdownTrigger>
            <DropdownMenu className={classes.dropdownMenu}>
                <DropdownSection className={classes.section}>
                    {options.map((option) => (
                        <DropdownItem
                            key={option.id}
                            onPress={() => handleOptionClick(option)}
                            startContent={selectedOption === option.id ? "✓" : ""}
                            className={classes.menuItem}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownSection>
                <DropdownSection className={classes.section}>
                    <DropdownItem
                        key="ascending"
                        onPress={() => handleOrderClick('ascending')}
                        startContent={sortOrder === 'ascending' ? "✓" : ""}
                        className={classes.menuItem}
                    >
                        Ascending
                    </DropdownItem>
                    <DropdownItem
                        key="descending"
                        onPress={() => handleOrderClick('descending')}
                        startContent={sortOrder === 'descending' ? "✓" : ""}
                        className={classes.menuItem}
                    >
                        Descending
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
});

const useStyles = makeGlobalChonkyStyles(() => ({
    dropdownButton: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: '14px',
        fontWeight: 400,
    },
    sortButtonContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 15px 0px 15px',
        justifyContent: 'space-between',
        height: '32px',
        width: '150px'
    },
    dropdownMenu: {
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        padding: '8px 0',
    },
    section: {
        padding: '0',
    },
    'section:not(:first-child)': {
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        marginTop: '8px',
        paddingTop: '8px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#2c2c2c',
        fontWeight: 400,
        minWidth: '180px',
        gap: '12px',
    },
    'menuItem [data-start-content]': {
        width: '24px',
        color: '#2c2c2c',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-start',
        minWidth: '24px',
    },
    'menuItem:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    }
}));