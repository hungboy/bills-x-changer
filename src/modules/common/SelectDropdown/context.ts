import { createContext } from 'react';
import { IDropdownOption, ISelectedOptionMap } from './types';
import { DEFAULT_OPTION_RENDERER } from './constants';

export interface ISelectDropdownContext<T> {
  options: IDropdownOption<T>[] | null;
  onSelect: (option: IDropdownOption<T>) => void;
  renderOption: (option: IDropdownOption<T>) => string | React.ReactElement;
  sortComparitor?: (a: IDropdownOption<T>, b: IDropdownOption<T>) => number;
  selectedOptionMap: ISelectedOptionMap<T>;
}

export const DEFAULT_CONTEXT: ISelectDropdownContext<any> = {
  options: null,
  renderOption: DEFAULT_OPTION_RENDERER,
  onSelect: (option: IDropdownOption<any>) => {},
  selectedOptionMap: {}
};

export const context = createContext(DEFAULT_CONTEXT);
