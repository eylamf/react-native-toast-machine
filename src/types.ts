import type { PropsWithChildren, ReactElement } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export type ToastInfo = {
  content: string | ReactElement | ((dismiss: () => void) => ReactElement);
  duration?: number;
};

export type ToastInfoWithId = ToastInfo & { id: string };

// export type CustomToastComponentProps = {
//   toast: ToastInfoWithId;
//   onDismiss: () => void;
// };

export type ToastProviderProps = PropsWithChildren<{
  maxNumberToRender?: number;
  duration?: number;
  additionalBottomSpacing?: number;
  toastStyles?: ViewStyle;
  toastLabelStyles?: TextStyle;
}>;
