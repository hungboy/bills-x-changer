import React from 'react';
import clsx from 'clsx';
import { ButtonVariant } from './types';
import './styles.scss';

export interface IButtonProps {
  classes?: string | string[];
  onClick?: React.MouseEventHandler;
  variant?: ButtonVariant;
  label: string;
  disabled?: boolean;
}

export const Button = ({
  classes,
  onClick,
  label,
  variant = 'primary',
  disabled = false
}: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx('button-component', variant, classes)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
