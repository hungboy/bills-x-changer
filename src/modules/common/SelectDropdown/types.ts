export interface BaseDropdownOption {
  label: string;
  key: string;
}

export interface IDropdownOption<T> extends BaseDropdownOption {
  data: T;
}

export interface ISelectedOptionMap<T> {
  [key: string]: IDropdownOption<T>;
}
