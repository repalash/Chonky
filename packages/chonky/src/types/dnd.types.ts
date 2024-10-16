import { Nilable } from 'tsdef';

import { StartDragNDropPayload } from './action-payloads.types';
import { FileData } from './file.types';

export interface ChonkyDndDropResult {
  dropTarget: Nilable<FileData> | any;
  dropEffect: 'move' | 'copy';
}

// any: used to be DragObjectWithType (removed from react-dnd)
export type ChonkyDndFileEntryItem = any & {
  payload: StartDragNDropPayload;
};
export const ChonkyDndFileEntryType = 'dnd-chonky-file-entry';
