# @eylamf/react-native-toast-machine

Toasts for React Native

## Installation

```sh
npm install @eylamf/react-native-toast-machine
# or using Yarn
yarn add @eylamf/react-native-toast-machine
```

## Basic usage

```tsx
import { ToastProvider, showToast } from '@eylamf/react-native-toast-machine';

export function MyScreen() {
  return (
    <ToastProvider>
      <MyScreenContent />
    </ToastProvider>
  );
}

function MyScreenContent() {
  const { showToast } = useToast();

  return <Button onPress={() => showToast({ content: 'Button pressed!' })} />;
}
```

## API/Hook

There are 3 ways of calling of the `showToast` hook.

1. Using basic string content

```tsx
showToast({ content: 'Some string content' });
```

2. Using a custom component

```tsx
showToast({ content: <MyCustomContent /> });
```

3. Using a function signature, which provides an `onDismiss` paramter that can be used to dismiss this toast.

```tsx
showToast({
  content: (onDismiss) => <MyCustomContent onPressXIcon={onDismiss} />,
});
```

## Props

| Name                      | Description                                                                                                            | Type        | Required |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| `additionalBottomSpacing` | Additional spacing between the bottom edge of the device and the toast components                                      | `number`    | no       |
| `duration`                | The amount of milliseconds each toast will display for. You can also pass this into the `showToast` function           | `number`    | no       |
| `maxNumberToRender`       | The max amount of toasts that will show on screen at once. If the limit is reached, the oldest toast will auto dismiss | `number`    | no       |
| `toastStyles`             | Custom styling for the toast's `View` container element                                                                | `ViewStyle` | no       |
| `toastLabelStyles`        | Custom styling for the toast's `Text` element                                                                          | `TextStyle` | no       |

## Types

1. `ToastInfo` - describes the structure of a Toast.
2. `ToastInfoWithId` - the same as the above, but with a unique `id` attribute.
3. `ToastProviderProps` - the props for the `ToastProvider` component.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
