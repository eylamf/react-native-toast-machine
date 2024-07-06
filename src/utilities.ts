import { LayoutAnimation } from 'react-native';

export function runLayoutAnimation() {
  LayoutAnimation.configureNext({
    duration: 350,
    update: {
      type: 'spring',
      property: 'scaleXY',
      springDamping: 0.8,
    },
  });
}
