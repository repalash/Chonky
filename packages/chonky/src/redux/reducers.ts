import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from 'tsdef';

import { FileAction, FileActionMap } from '../file-actons/actions.types';
import { GenericFileActionHandler } from '../file-actons/handler.types';
import { ToolbarItemArray } from '../file-actons/presentation.types';
import { FileViewConfig } from '../types/file-view.types';
import { FileArray, FileIdTrueMap, FileMap } from '../types/files.types';
import { OptionMap } from '../types/options.types';
import { FileSelection } from '../types/selection.types';
import { SortOrder } from '../types/sort.types';
import { ThumbnailGenerator } from '../types/thumbnails.types';
import { FileHelper } from '../util/file-helper';
import { initialRootState } from './state';

export const { actions: reduxActions, reducer: rootReducer } = createSlice({
    name: 'root',
    initialState: initialRootState,
    reducers: {
        setExternalFileActionHandler(
            state,
            action: PayloadAction<Nullable<GenericFileActionHandler<FileAction>>>
        ) {
            state.externalFileActionHandler = action.payload;
        },
        setRawFileActions(state, action: PayloadAction<FileAction[] | any>) {
            state.rawFileActions = action.payload;
        },
        setFileActionsErrorMessages(state, action: PayloadAction<string[]>) {
            state.fileActionsErrorMessages = action.payload;
        },
        setFileActions(state, action: PayloadAction<FileAction[]>) {
            const fileActionMap: FileActionMap = {};
            action.payload.map((a) => (fileActionMap[a.id] = a));
            const fileIds = action.payload.map((a) => a.id);

            state.fileActionMap = fileActionMap as FileMap;
            state.fileActionIds = fileIds;
        },
        setToolbarItems(state, action: PayloadAction<ToolbarItemArray>) {
            state.toolbarItems = (action.payload as ToolbarItemArray) as any;
        },
        setRawFolderChain(state, action: PayloadAction<FileArray | any>) {
            state.rawFolderChain = action.payload;
        },
        setFolderChainErrorMessages(state, action: PayloadAction<string[]>) {
            state.folderChainErrorMessages = action.payload;
        },
        setFolderChain(state, action: PayloadAction<FileArray>) {
            state.folderChain = action.payload;
        },
        setRawFiles(state, action: PayloadAction<FileArray | any>) {
            state.rawFiles = action.payload;
        },
        setFilesErrorMessages(state, action: PayloadAction<string[]>) {
            state.filesErrorMessages = action.payload;
        },
        setFiles(state, action: PayloadAction<FileArray>) {
            const fileMap: FileMap = {};
            action.payload.map((f) => (f ? (fileMap[f.id] = f) : null));
            const fileIds = action.payload.map((f) => (f ? f.id : null));
            const cleanFileIds = fileIds.filter((f) => !!f) as string[];

            state.fileMap = fileMap;
            state.fileIds = fileIds;
            state.cleanFileIds = cleanFileIds;
        },
        setSortedFileIds(state, action: PayloadAction<Nullable<string>[]>) {
            state.sortedFileIds = action.payload;
        },
        setHiddenFileIds(state, action: PayloadAction<FileIdTrueMap>) {
            state.hiddenFileIdMap = action.payload;
        },
        setDisplayFileIds(state, action: PayloadAction<Nullable<string>[]>) {
            state.displayFileIds = action.payload;
        },
        selectAllFiles(state) {
            state.fileIds
                .filter((id) => id && FileHelper.isSelectable(state.fileMap[id]))
                .map((id) => (id ? (state.selectionMap[id] = true) : null));
        },
        selectRange(
            state,
            action: PayloadAction<{ rangeStart: number; rangeEnd: number }>
        ) {
            state.selectionMap = {};
            state.displayFileIds
                .slice(action.payload.rangeStart, action.payload.rangeEnd + 1)
                .filter((id) => id && FileHelper.isSelectable(state.fileMap[id]))
                .map((id) => (state.selectionMap[id!] = true));
        },
        selectFiles(
            state,
            action: PayloadAction<{ fileIds: string[]; reset: boolean }>
        ) {
            if (state.disableSelection) return;
            if (action.payload.reset) state.selectionMap = {};
            action.payload.fileIds
                .filter((id) => id && FileHelper.isSelectable(state.fileMap[id]))
                .map((id) => (state.selectionMap[id] = true));
        },
        toggleSelection(
            state,
            action: PayloadAction<{ fileId: string; exclusive: boolean }>
        ) {
            if (state.disableSelection) return;
            const oldValue = !!state.selectionMap[action.payload.fileId];
            if (action.payload.exclusive) state.selectionMap = {};
            if (oldValue) delete state.selectionMap[action.payload.fileId];
            else if (FileHelper.isSelectable(state.fileMap[action.payload.fileId])) {
                state.selectionMap[action.payload.fileId] = true;
            }
        },
        cleanUpSelection(state) {
            // Make sure files that are not visible anymore are not a part of the
            // selection.
            const newSelectionMap: FileSelection = {};
            state.displayFileIds.map((id) => {
                if (id && id in state.selectionMap) newSelectionMap[id] = true;
            });
            state.selectionMap = newSelectionMap;
        },
        clearSelection(state) {
            if (state.disableSelection) return;
            if (Object.keys(state.selectionMap).length !== 0) state.selectionMap = {};
        },
        setFileViewConfig(state, action: PayloadAction<FileViewConfig>) {
            state.fileViewConfig = action.payload;
        },
        setSort(state, action: PayloadAction<{ actionId: string; order: SortOrder }>) {
            state.sortActionId = action.payload.actionId;
            state.sortOrder = action.payload.order;
        },
        setOptionDefaults(state, action: PayloadAction<OptionMap>) {
            for (const optionId of Object.keys(action.payload)) {
                if (optionId in state.optionMap) continue;
                state.optionMap[optionId] = action.payload[optionId];
            }
        },
        toggleOption(state, action: PayloadAction<string>) {
            state.optionMap[action.payload] = !state.optionMap[action.payload];
        },
        setThumbnailGenerator(
            state,
            action: PayloadAction<Nullable<ThumbnailGenerator>>
        ) {
            state.thumbnailGenerator = action.payload;
        },
        setDoubleClickDelay(state, action: PayloadAction<number>) {
            state.doubleClickDelay = action.payload;
        },
        setDisableDragAndDrop(state, action: PayloadAction<boolean>) {
            state.disableDragAndDrop = action.payload;
        },
        setClearSelectionOnOutsideClick(state, action: PayloadAction<boolean>) {
            state.clearSelectionOnOutsideClick = action.payload;
        },
        setLastClickIndex(state, action: PayloadAction<Nullable<number>>) {
            state.lastClickIndex = action.payload;
        },
    },
});