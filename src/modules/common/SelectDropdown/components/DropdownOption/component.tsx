import React, { useContext } from 'react';
import { context } from '../../context';
import { IDropdownOption } from '../../types';
import './styles.scss';

export interface IDropdownOptionProps<T> {
  option: IDropdownOption<T>;
}

export const DropdownOption = <T extends {}>({
  option
}: IDropdownOptionProps<T>) => {
  const { renderOption, onSelect } = useContext(context);

  return (
    <li
      className="select-dropdown__drop-down-option"
      onClick={e => {
        onSelect(option);
      }}
    >
      {renderOption(option)}
    </li>
  );
};
