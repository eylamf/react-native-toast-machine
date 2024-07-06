import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import type { ToastInfo, ToastInfoWithId } from './types';
import { Toast } from './components/Toast';
import { runLayoutAnimation } from './utilities';

type Props = PropsWithChildren<{
  maxNumberToRender?: number;
  duration?: number;
  additionalBottomSpacing?: number;
  toastStyles?: ViewStyle;
  toastLabelStyles?: TextStyle;
}>;

type ToastContext = {
  showToast: (info: ToastInfo) => void;
};

const Context = createContext<ToastContext>(null as any);

export const useToast = () => useContext(Context);

const DEFAULT_BOTTOM_SPACING = 20;
let ID = 1;

export function ToastProvider({
  children,
  maxNumberToRender = 3,
  duration = 2500,
  additionalBottomSpacing = 0,
  toastStyles,
  toastLabelStyles,
}: Props) {
  const [toasts, setToasts] = useState<ToastInfoWithId[]>([]);
  const timeouts = useRef(new Map<string, NodeJS.Timeout>());
  const insets = useSafeAreaInsets();
  const bottomSpacing =
    (insets.bottom || DEFAULT_BOTTOM_SPACING) + additionalBottomSpacing;

  useEffect(() => {
    return () => {
      if (timeouts.current.size > 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeouts.current.forEach((value) => {
          clearTimeout(value);
        });
      }
    };
  }, []);

  const clearTimeoutForId = useCallback((id: string) => {
    if (timeouts.current.has(id)) {
      clearTimeout(timeouts.current.get(id));
      timeouts.current.delete(id);
    }
  }, []);

  const context = useMemo<ToastContext>(
    () => ({
      showToast: (info) => {
        const id = (ID++).toString();
        const timeout = setTimeout(() => {
          setToasts((current) => {
            const index = current.findIndex((item) => item.id === id);

            if (index > -1) {
              const copy = current.slice(0);
              copy.splice(index, 1);

              timeouts.current.delete(id);

              return copy;
            }

            return current;
          });
        }, info.duration ?? duration);

        timeouts.current.set(id, timeout);

        runLayoutAnimation();
        setToasts((current) => {
          const result = current.concat({ ...info, id });

          if (result.length > maxNumberToRender) {
            const overflowCount = result.length - maxNumberToRender;

            for (let i = 0; i < overflowCount; i++) {
              const idToRemove = result[i]?.id;

              if (idToRemove) {
                clearTimeoutForId(idToRemove);
              }
            }

            return result.slice(overflowCount);
          }

          return result;
        });
      },
    }),
    [duration, maxNumberToRender, clearTimeoutForId]
  );

  const handleManuallyDismiss = useCallback(
    (id: string) => {
      runLayoutAnimation();
      setToasts((current) => {
        const index = current.findIndex((item) => item.id === id);

        if (index > -1) {
          const copy = current.slice();

          copy.splice(index, 1);
          clearTimeoutForId(id);

          return copy;
        }

        return current;
      });
    },
    [clearTimeoutForId]
  );

  return (
    <Context.Provider value={context}>
      <View style={styles.container}>
        {children}
        {toasts.length > 0 && (
          <View
            style={[styles.toastsWrapper, { paddingBottom: bottomSpacing }]}
            pointerEvents="box-none"
          >
            {toasts.map((toast) => (
              <Toast
                {...toast}
                key={toast.id}
                containerStyles={toastStyles}
                labelStyles={toastLabelStyles}
                onDismiss={handleManuallyDismiss}
              />
            ))}
          </View>
        )}
      </View>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toastsWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});
