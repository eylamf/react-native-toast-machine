import { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  Easing,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import type { ToastInfoWithId } from '../types';

type Props = ToastInfoWithId & {
  containerStyles?: ViewStyle;
  labelStyles?: TextStyle;
  onDismiss: (id: string) => void;
};

export const Toast = memo(function _Toast({
  id,
  content,
  containerStyles,
  labelStyles,
  onDismiss,
}: Props) {
  const renderMessage = () => {
    if (typeof content === 'string') {
      return (
        <Text style={[styles.contentText, labelStyles]}>
          {content} {id}
        </Text>
      );
    } else if (typeof content === 'function') {
      return content(() => onDismiss(id));
    }

    return content;
  };

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(70).stiffness(1000)}
      exiting={FadeOut.duration(150).easing(Easing.out(Easing.poly(2)))}
    >
      <View style={[styles.container, containerStyles]}>
        <View style={styles.flexOne}>{renderMessage()}</View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: 20,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: 'black',
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 14,
  },
  flexOne: { flex: 1 },
  contentText: { color: 'white' },
  dismissBtn: {},
});
