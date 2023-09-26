import React from 'react';
import {View, StyleSheet} from 'react-native';
import uppercaseStyles from '../app/alphabetuppercase/uppercaseStyles';
import Animated from 'react-native-reanimated';
import AnimatedArrow from './AnimatedArrow';

const AnimatedView = ({children, styleProps, strokeStyle}) => {
    
    return (
        <Animated.View style={[strokeStyle, uppercaseStyles.strokes, styleProps]} >
            <AnimatedArrow />
            <View style={uppercaseStyles.point} />
            <View style={uppercaseStyles.point} />
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({})

export default AnimatedView;
