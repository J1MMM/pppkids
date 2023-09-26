import React from 'react';
import {View, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


const AnimatedArrow = ({height}) => {
    const arrows = new Array(5).fill(0).map((_, index) => ({id: index}))
    const duration = 500;
    const opacity = useSharedValue(0)
    const AnimatedIcon= Animated.createAnimatedComponent(MaterialCommunityIcons)

    const animatedStyle = useAnimatedStyle(()=>{
        return{
            opacity: opacity.value
        }
    })

      // Define the animation function to change the opacity from 0 to 1 and repeat infinitely
  const startAnimation = () => {
    opacity.value = withRepeat(withTiming(1, { duration }), -1, true);
  };

  React.useEffect(() => {
    // Start the animation when the component mounts
    startAnimation();
    // Clean up the animation when the component unmounts
    return () => {
      opacity.value = 0;
    };
  }, []);



    const ArrowElement = arrows.map((item)=>{
        return <AnimatedIcon key={item.id} style={animatedStyle} name="chevron-double-down" size={50} color="#052849" />
    })
    
    return (
        <View style={styles.container}>
            {ArrowElement}
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        // borderWidth: 1,
        overflow: 'hidden',
        position: 'absolute',
        marginVertical: '50%',
        width: '100%',
        height: '80%',
        alignItems: 'center',
        paddingVertical: 10,
        gap: -10
    }
})

export default AnimatedArrow;
