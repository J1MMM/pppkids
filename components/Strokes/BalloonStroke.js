import { Audio } from "expo-av";
import * as React from "react";
import { StyleSheet} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";


const soundObject = new Audio.Sound();
const soundObject1 = new Audio.Sound();
const soundObject2 = new Audio.Sound();
soundObject.loadAsync(require('../../assets/audio/stroke-up.mp3'));
soundObject1.loadAsync(require('../../assets/audio/stroke-down.mp3'));
soundObject2.loadAsync(require('../../assets/audio/cling.mp3'));

// Play the sound synchronously
function playTapSound() {
  soundObject.replayAsync();
}
function playDownSound() {
  soundObject1.replayAsync();
}
function playDone(){
  soundObject2.replayAsync();
}

const BalloonStroke
= ({height, width, horizontal, goUp, done, round}) => {

  const svgHeight = useSharedValue(height-10)
  const svgOpacity = useSharedValue(1)
  const isActive = useSharedValue(true)
  const AnimatedRect = Animated.createAnimatedComponent(Rect)

  const onStart = () =>{
    svgHeight.value = withTiming(50);
    svgOpacity.value = withTiming(0);
    isActive.value = true
  }

  React.useEffect(()=>{
    if(round >= 1){
      const timeout = setTimeout(()=>{
        onStart()
      },2000)

      return () => clearTimeout(timeout)
    }else{
      onStart()
    }
    },[round])

  const handlePanGesture = useAnimatedGestureHandler({
      onStart(_, ctx){
        // runOnJS(playTapSound)();
        ctx.val = svgHeight.value;
        svgOpacity.value = 1;
      },
      onActive({translationY, translationX}, ctx){
        if(svgHeight.value < height-10 && goUp !== true){
          if(horizontal ){
            svgHeight.value = ctx.val + translationX
          }else{
            svgHeight.value = ctx.val + translationY
          }
        }else if(svgHeight.value < height-10 && goUp == true){
          svgHeight.value = ctx.val + -translationY
        }
      },
      onEnd(){
        if(svgHeight.value < height-10){
          // runOnJS(playDownSound)();
          svgHeight.value = withSpring(50)
          svgOpacity.value = withTiming(0,{duration: 500})
        }else{
          // runOnJS(playDone)();
          svgHeight.value = withSpring(height-10)
          isActive.value = false
          runOnJS(done)()
        }
      },

      onFail(){
        if(svgHeight.value != height-10){
          svgHeight.value = withSpring(50)
          svgOpacity.value = withTiming(0)
        }
      }
  })

  const RangeStyle = useAnimatedStyle(()=>{
    return{
      height: svgHeight.value,
      opacity: svgOpacity.value
    }
  })

  const balloonReflection1 = useAnimatedStyle(()=>{
    if(svgHeight.value < 150){
      return{
        opacity: 0
      }
    }
    return{
      height: svgHeight.value * .30,
      opacity: withTiming(svgOpacity.value)
    }
  })

  const balloonReflection2 = useAnimatedStyle(()=>{
    if(svgHeight.value < 150){
      return{
        opacity: 0
      }
    }
    return{
      height: 11,
      opacity: withTiming(svgOpacity.value)
    }
  })

  const containerProps = useAnimatedProps(()=>{
      return{
        pointerEvents:  isActive.value ? 'auto' : 'none'
      }
  })
  
  return (
    <Animated.View style={styles.container} animatedProps={containerProps}>
      <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      >
      <PanGestureHandler onGestureEvent={handlePanGesture}>
      <AnimatedRect
        x={2.5}
        y={2.5}
        width={width-5}
        animatedProps={RangeStyle}
        rx={27.5}
        fill={"#00B1FF"}
        stroke="#FEF4EE"
        strokeWidth={5}
        />
      </PanGestureHandler>
      <AnimatedRect
        x={37}
        y={24.6429}
        width={11}
        animatedProps={balloonReflection2}
        rx={5.5}
        fill="#93DCFE"
      />
      <AnimatedRect
        x={37}
        y={48.2143}
        width={11}
        animatedProps={balloonReflection1}
        rx={5.5}
        fill="#93DCFE"
      />
    </Svg>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
  },
})

export default BalloonStroke;
