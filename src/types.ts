import type { ReactElement } from 'react';

export type ToastInfo = {
  content: string | ReactElement | ((dismiss: () => void) => ReactElement);
  duration?: number;
};

export type ToastInfoWithId = ToastInfo & { id: string };

export type CustomToastComponentProps = {
  toast: ToastInfoWithId;
  onDismiss: () => void;
};
