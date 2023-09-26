import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React from 'react';
import {View, StyleSheet, Dimensions, Image, Pressable, Text} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height;
const containerHeight = windowHeight * 0.45;

// Preload the sound
const soundObject = new Audio.Sound();
soundObject.loadAsync(require('../assets/audio/selected.wav'));

// Play the sound synchronously
function playSelectedSound() {
  soundObject.replayAsync();
}

const ModalItem = ({url}) => {
    const router = useRouter()
    const scale = useSharedValue(1)
    
    const handlePress = () =>{
        // playSelectedSound();
        scale.value = 0.8;
        scale.value = withSpring(1)

        console.log(url);
        router.push(url)

    }

    const animaredStyle = useAnimatedStyle(()=>{
        return{
            transform: [{scale: scale.value}]
        }
    })

    

    return (
        <Pressable onPress={handlePress}>
        <Animated.View style={[animaredStyle, styles.container]} >
            {/* <Text>{url}</Text> */}
            <Image source={require('../assets/images/ABCTRACEUPPERCASE/uppercaseA.jpg')} resizeMode='cover' style={{width: '100%', height: '100%'}} />
        </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        overflow: 'hidden',
        height: containerHeight,
        width: containerHeight + 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
    }
})

export default ModalItem;
