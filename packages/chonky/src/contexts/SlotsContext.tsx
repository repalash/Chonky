import React, { createContext } from 'react';

export interface SlotsContextValue {
  EmptyComponent?: React.ComponentType;
}

export const SlotsContext = createContext<SlotsContextValue>({});

export const SlotsProvider: React.FC<{
  children: React.ReactNode;
  value: SlotsContextValue;
}> = ({ children, value }) => {
  return (
    <SlotsContext.Provider value={value}>
      {children}
    </SlotsContext.Provider>
  );
}; 