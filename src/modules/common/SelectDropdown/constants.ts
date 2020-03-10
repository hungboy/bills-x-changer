import { IDropdownOption } from './types';

export const DEFAULT_OPTION_RENDERER = <T extends {}>(
  option: IDropdownOption<T>
) => option.label;

export const DEFAULT_EMPTY_STRING = 'Select an Option';
export const DEFAULT_NULL_STRING = 'No options available...';
