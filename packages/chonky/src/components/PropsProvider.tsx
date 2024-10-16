import React, {createContext, Provider, useState} from 'react';
import {FileBrowserProps} from '../types/file-browser.types'

// Create a context
export const PropsContext = createContext<{listCols: FileBrowserProps['listCols']}>({listCols: []});

// Create the provider component
export const PropsProvider: React.FC<{initialValue: {listCols: FileBrowserProps['listCols']}, children: React.ReactNode}>
    = ({ children, initialValue }) => {
    return (
        <PropsContext.Provider value={initialValue}>
            {children}
        </PropsContext.Provider>
    );
};
