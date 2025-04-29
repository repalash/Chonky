import React, { UIEvent, useCallback, useContext, useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';

import { ChonkyActions } from '../../action-definitions/index';
import { selectCurrentFolder, selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import { ChonkyIconName } from '../../types/icons.types';
import { useFileDrop } from '../../util/dnd';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, getStripeGradient, makeGlobalChonkyStyles, makeLocalChonkyStyles } from '../../util/styles';
import { FileListEmpty } from './FileListEmpty';
import { GridContainer } from './GridContainer';
import { ListContainer } from './ListContainer';

function throttle<F extends (...args: any[]) => void>(fn: F, wait = 150): F {
  let last = 0;
  let timer: NodeJS.Timeout | null = null;
  return function(this: any, ...args: Parameters<F>) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  } as F;
}

export interface FileListProps {
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
  hasMore?: boolean;
  loadNext?: () => Promise<void> | void;
  /** Prefetch distance (px) from bottom before triggering `loadNext` – default 300 */
  threshold?: number;
}

interface StyleState {
  dndCanDrop: boolean;
  dndIsOverCurrent: boolean;
}

export const FileList: React.FC<FileListProps> = React.memo((props: FileListProps) => {
  const {
    onScroll,
    hasMore = false,
    loadNext,
    threshold = 300,
  } = props;

  const displayFileIds = useSelector(selectors.getDisplayFileIds);
  const viewConfig = useSelector(selectFileViewConfig);

  const currentFolder = useSelector(selectCurrentFolder);
  const { drop, dndCanDrop, dndIsOverCurrent } = useFileDrop({ file: currentFolder });
  const styleState = useMemo<StyleState>(() => ({ dndCanDrop, dndIsOverCurrent }), [dndCanDrop, dndIsOverCurrent]);
  const localClasses = useLocalStyles(styleState);
  const classes = useStyles(viewConfig);

  const loadingRef = useRef(false);
  const loadingIndex = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkAndLoad = async () => {
      const el = (scrollContainerRef.current as any)?._outerRef

      if (!el) return;

      const currentIndex = loadingIndex.current + 1;
      loadingIndex.current = currentIndex; 
      while (loadingRef.current) {
        await new Promise(resolve => setTimeout(resolve, 50));
      } 
      if (currentIndex !== loadingIndex.current) {
        return;
      } 
      if (el && hasMore && loadNext && el.scrollHeight <= el.clientHeight + 100 
        && displayFileIds.length != 0 && displayFileIds[0] != null) {
        loadingRef.current = true;
        try {
          await loadNext();
        } catch (error) {
           console.error("Error calling loadNext:", error);
        } finally {
          // Use a small timeout to prevent rapid calls
          setTimeout(() => {
             loadingRef.current = false;
          }, 50);
        }
      }
    };
    setTimeout(() => {
      checkAndLoad();
    } , 100)
  }, [displayFileIds , loadNext]);

  //to get delta 
  const currentScrollTop = useRef(0);
  const internalScrollHandler = useCallback(
    throttle(async (e: any) => {
      if (onScroll) onScroll(e);
      if (!hasMore || !loadNext) return;
      const el = (scrollContainerRef.current as any)?._outerRef
      if (!el) return;

      //if user is scrolling up then ignore it
      if(currentScrollTop.current > el.scrollTop) {
        currentScrollTop.current = el.scrollTop;
        return;
      }
      currentScrollTop.current = el.scrollTop;

      const dist = el.scrollHeight - (el.scrollTop + el.clientHeight);

      if (dist < threshold && !loadingRef.current) {
        loadingRef.current = true;
        try {
          await loadNext();
        } catch (error) {
           console.error("Error calling loadNext on scroll:", error);
        } finally {
          loadingRef.current = false;
        }
      }
    }, 150),
    [onScroll, hasMore, loadNext, threshold , loadingRef.current , scrollContainerRef.current],
  );
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const el = (scrollContainerRef as any).current?._outerRef;
    if (!el) return;
    
    el.addEventListener('scroll', internalScrollHandler, {capture: true});

    return () => {
      el.removeEventListener('scroll', internalScrollHandler , {capture: true});
    };
  }, [scrollContainerRef.current , viewConfig.mode , internalScrollHandler ]);



  useEffect(() => {
    loadingRef.current = false;
  }, [currentFolder?.id]);

  // In Chonky v0.x, this field was user-configurable. In Chonky v1.x+, we hardcode
  // this to `true` to simplify configuration. Users can just wrap Chonky in their
  // own `div` if they want to have finer control over the height.
  const fillParentContainer = true;

  const listRenderer = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      if (displayFileIds.length === 0) {
        return <FileListEmpty width={width} height={height} />;
      } else if (viewConfig.mode === FileViewMode.List) {
        return <ListContainer scrollRef={scrollContainerRef as any} width={width} height={height} />;
      } else {
        return <GridContainer scrollRef={scrollContainerRef as any} width={width} height={height} />;
      }
    },
    [displayFileIds, viewConfig],
  );

  const ChonkyIcon = useContext(ChonkyIconContext);
  return (
    <div
      onScroll={onScroll}
      ref={drop}
      className={c([classes.fileListWrapper, localClasses.fileListWrapper])}
      role="list"
    >
      <div className={localClasses.dndDropZone}>
        <div className={localClasses.dndDropZoneIcon}>
          <ChonkyIcon icon={dndCanDrop ? ChonkyIconName.dndCanDrop : ChonkyIconName.dndCannotDrop} />
        </div>
      </div>
      <AutoSizer disableHeight={!fillParentContainer}>{listRenderer}</AutoSizer>
    </div>
  );
});
FileList.displayName = 'FileList';

const useLocalStyles = makeLocalChonkyStyles((theme) => ({
  fileListWrapper: {
    minHeight: ChonkyActions.EnableGridView.fileViewConfig.entryHeight + 2,
    background: (state: StyleState) =>
      state.dndIsOverCurrent && state.dndCanDrop
        ? state.dndCanDrop
          ? getStripeGradient(theme.dnd.fileListCanDropMaskOne, theme.dnd.fileListCanDropMaskTwo)
          : getStripeGradient(theme.dnd.fileListCannotDropMaskOne, theme.dnd.fileListCannotDropMaskTwo)
        : 'none',
  },
  dndDropZone: {
    display: (state: StyleState) =>
      // When we cannot drop, we don't show an indicator at all
      state.dndIsOverCurrent && state.dndCanDrop ? 'block' : 'none',
    borderRadius: theme.gridFileEntry.borderRadius,
    pointerEvents: 'none',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2
  },
  dndDropZoneIcon: {
    backgroundColor: (state: StyleState) => (state.dndCanDrop ? theme.dnd.canDropMask : theme.dnd.cannotDropMask),
    color: (state: StyleState) => (state.dndCanDrop ? theme.dnd.canDropColor : theme.dnd.cannotDropColor),
    borderRadius: theme.gridFileEntry.borderRadius,
    transform: 'translateX(-50%) translateY(-50%)',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: '60px',
    fontSize: '2em',
    left: '50%',
    height: 60,
    top: '50%',
    width: 60,
  },
}));

const useStyles = makeGlobalChonkyStyles(() => ({
  fileListWrapper: {
    height: '100%',
    maxHeight: '100%'
  },
}));
