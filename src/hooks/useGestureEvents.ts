import {useState} from 'react';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const useGestureEvents = () => {
  const [opacity, setOpacity] = useState(1);
  const translateY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    event.nativeEvent.translationY < 0
      ? setOpacity(opacity + event.nativeEvent.translationY / 10000)
      : setOpacity(opacity - event.nativeEvent.translationY / 10000);
    translateY.value = event.nativeEvent.translationY;
  };

  const onGestureEnd = () => {
    setOpacity(1);
    translateY.value = withSpring(0);
  };
  return {onGestureEvent, onGestureEnd, animatedStyle, opacity};
};
