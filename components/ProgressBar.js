import * as React from "react";
import Animated, { Easing, round, useAnimatedProps, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

const ProgressBar = ({round}) => {
  const progress = useSharedValue(0)
  
  if(round != 0 && progress.value < 0.99){
    progress.value = withTiming(progress.value + 0.33, {duration: 1000, easing: Easing.ease})
  }

  const AnimatedRect = Animated.createAnimatedComponent(Rect)

  const RectStyle = useAnimatedProps(()=>{
    return {
      height : 240*progress.value
    }
  })
  return  (
    <Svg
      width={50}
      height={250}
      viewBox="0 0 50 250"
      fill="none"
    >
      <Rect
        x={2.5}
        y={2.5}
        width={45}
        height={245}
        rx={7.5}
        fill="#7D4208"
        stroke="#D37823"
        strokeWidth={5}
      />
      <AnimatedRect
        animatedProps={RectStyle}
        x={5}
        y={5}
        width={40}
        rx={5}
        fill="url(#paint0_linear_3_20)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3_20"
          x1={25}
          y1={5}
          x2={25}
          y2={245}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FDCB1A" />
          <Stop offset={0.9999} stopColor="#FDB012" />
          <Stop offset={1} stopColor="#FDB112" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
export default ProgressBar;
