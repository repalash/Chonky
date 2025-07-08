export enum FileViewMode {
  List = 'list',
  Compact = 'compact',
  Grid = 'grid',
  LargeGrid = 'large_grid'
}

export type FileViewConfigList = {
  mode: FileViewMode.List;
  entryHeight: number;
};

export type FileViewConfigGrid = {
  mode: FileViewMode.Compact | FileViewMode.Grid;
  entryWidth: number;
  entryHeight: number;
};

export type FileViewConfigLargeGrid = {
  mode: FileViewMode.LargeGrid,
  entryWidth: number;
  entryHeight: number;
};

export type FileViewConfig = FileViewConfigList | FileViewConfigGrid | FileViewConfigLargeGrid;
