import { useContext } from 'react';
import { SlotsContext } from '../contexts/SlotsContext';

export const useSlots = () => {
  return useContext(SlotsContext);
}; 