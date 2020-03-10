import React, { useState, useRef, useEffect } from 'react';
import { IDropdownOption, ISelectedOptionMap } from './types';
import { context as DropdownContext } from './context';
import {
  DEFAULT_OPTION_RENDERER,
  DEFAULT_EMPTY_STRING,
  DEFAULT_NULL_STRING
} from './constants';
import { DropdownOption } from './components/DropdownOption';
import { useEventListener } from '../../../utils/hooks';
import clsx from 'clsx';
import './styles.scss';

export interface ISelectDropdownProps<T> {
  classes?: string[];
  options: IDropdownOption<T>[] | null;
  nullString?: string;
  emptyString?: string;
  onSelect?: (option: IDropdownOption<T>) => void;
  renderOption?: (option: IDropdownOption<T>) => string | React.ReactElement;
  renderHeader?: (option: IDropdownOption<T>) => string | React.ReactElement;
  selectedOption?: IDropdownOption<T>;
  sortComparitor?: (a: IDropdownOption<T>, b: IDropdownOption<T>) => number;
}

export const SelectDropdown = <T extends {}>({
  classes = [],
  options,
  nullString,
  emptyString,
  onSelect,
  renderOption,
  renderHeader,
  selectedOption,
  sortComparitor
}: ISelectDropdownProps<T>) => {
  const optionsRef = useRef<any>(null);
  const selectorRef = useRef<any>(null);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedOptionMap, setSelectedOptionMap] = useState<
    ISelectedOptionMap<T>
  >(selectedOption ? { [selectedOption.key]: selectedOption } : {});
  const [selectorClientRect, setSelectorClientRect] = useState<ClientRect>();

  const handleSelect = (option: IDropdownOption<T>) => {
    setSelectedOptionMap({ [option.key]: option });

    if (typeof onSelect !== 'undefined') {
      onSelect(option);
    }

    setOpen(false);
  };

  const toggleDropdown = (event: React.MouseEvent) => {
    setOpen(!isOpen);
  };

  const handleExternalClick = (event: React.MouseEvent) => {
    if (
      (selectorRef.current ?? false) &&
      selectorRef.current.contains(event.target)
    ) {
      return;
    }
    if (
      (optionsRef.current ?? false) &&
      optionsRef.current.contains(event.target)
    ) {
      return;
    }

    if (isOpen) {
      setOpen(false);
    }
  };

  const updateSelectorClientRect = () => {
    if (selectorRef.current ?? false) {
      const clientRect: ClientRect = selectorRef.current.getBoundingClientRect();
      setSelectorClientRect(clientRect);
    }
  };

  useEffect(() => {
    updateSelectorClientRect();
  }, []);

  useEventListener('click', handleExternalClick);
  useEventListener('resize', updateSelectorClientRect);

  const renderHeaderTitle = () => {
    const selectedOption: [string, IDropdownOption<T>] = Object.entries(
      selectedOptionMap
    )[0];
    if (selectedOption) {
      return typeof renderHeader !== 'undefined'
        ? renderHeader(selectedOption[1])
        : selectedOption[1].label;
    } else if (options ?? true) {
      return nullString ?? DEFAULT_EMPTY_STRING;
    } else {
      return emptyString ?? DEFAULT_NULL_STRING;
    }
  };

  const headerTitle = renderHeaderTitle();

  return (
    <DropdownContext.Provider
      value={{
        options,
        onSelect: handleSelect,
        renderOption: renderOption ?? DEFAULT_OPTION_RENDERER,
        selectedOptionMap,
        sortComparitor
      }}
    >
      <div className={clsx('select-dropdown', classes)}>
        <div
          className="select-dropdown_header"
          onClick={event => toggleDropdown(event)}
          ref={ref => {
            selectorRef.current = ref;
          }}
          onFocus={event => setOpen(true)}
          onBlur={event => setOpen(false)}
        >
          <div className="select-drop-down_header_title">{headerTitle}</div>
        </div>
      </div>
      {isOpen &&
        selectorClientRect &&
        renderDropdownOptions(options, optionsRef, selectorClientRect)}
    </DropdownContext.Provider>
  );
};

export const renderDropdownOptions = <T extends {}>(
  options: IDropdownOption<T>[] | null,
  optionsRef: React.MutableRefObject<any>,
  selectorClientRect: ClientRect
) => {
  const { bottom, left, width } = selectorClientRect;
  return (
    <ul
      className="select-dropdown_menu"
      style={{ top: bottom, left, width }}
      ref={ref => {
        optionsRef.current = ref;
      }}
    >
      <React.Fragment>
        {options &&
          options.map(option => (
            <DropdownOption key={option.key} option={option} />
          ))}
      </React.Fragment>
    </ul>
  );
};
