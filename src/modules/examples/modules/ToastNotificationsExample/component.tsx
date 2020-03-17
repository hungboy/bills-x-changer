import React, { useState } from 'react';
import { Button } from '../../../common';
import { SelectDropdown } from '../../../common/SelectDropdown';
import { IDropdownOption } from '../../../common/SelectDropdown/types';
import { ToastVariant } from '../../../common/ToastNotification/types';
import { useToastNotifications } from '../../../common/ToastNotification';

export const ToastNotificationsExample = () => {
  const [toastVariant, setToastVariant] = useState<ToastVariant>();
  const toastProvider = useToastNotifications();

  const handleAddToast = () => {
    if (toastProvider) {
      const { addToast } = toastProvider;

      addToast({ variant: toastVariant });
    }
  };

  return (
    <div>
      <SelectDropdown<ToastVariant>
        classes={['notification-variant']}
        options={DROPDOWN_OPTIONS}
        emptyString="Select toast style variant."
        onSelect={({ data }) => {
          setToastVariant(data);
        }}
      />
      <Button
        onClick={handleAddToast}
        disabled={!toastVariant}
        label="Add a notification"
      />
    </div>
  );
};

const DROPDOWN_OPTIONS: IDropdownOption<ToastVariant>[] = [
  { key: 'info', data: 'info', label: 'Info Variant' },
  { key: 'success', data: 'success', label: 'Success Variant' },
  { key: 'error', data: 'error', label: 'Error Variant' },
  { key: 'warning', data: 'warning', label: 'Warning Variant' }
];
