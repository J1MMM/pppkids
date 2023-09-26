import { useRouter, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, Pressable} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import BackButton from '../../components/BackButton'
import { Audio } from 'expo-av';
import UppercaseA from '../../components/alphabet/uppercase/A';
import UppercaseB from '../../components/alphabet/uppercase/B';
import BgSvgComponent from '../../components/BgSvgComponent';
import ProgressBar from '../../components/ProgressBar';

const soundObject = new Audio.Sound();
soundObject.loadAsync(require('../../assets/audio/back.wav'));

// Play the sound synchronously
function playBackSound() {
  soundObject.replayAsync();
}


const Page = () => {
    const {letter} = useSearchParams()
    const router = useRouter()
    const scale = useSharedValue(1)
    const containerScale = useSharedValue(1)
    const containerRotation = useSharedValue(0)
    const [round, setRound] = useState(0) 
    const strokes = useSharedValue([
        {id: 0, done: false, active: true},
        {id: 1, done: false, active: false},
        {id: 2, done: false, active: false},
    ])

    const strokeDone = async() => {
        let allDone = Boolean(strokes.value.every(item => item.done))
        const currentActive = strokes.value.find(item => item.active)

        if(!allDone){
            strokes.value = strokes.value.map((item)=>{
                if(item.id == currentActive.id){
                return {...item, done: true, active: false}
                }else if(item.id == currentActive.id+1){
                return {...item, active: true}
                }else{
                return item
                }
            })
        }

        await new Promise(resolve => setTimeout(resolve, 5)); // Wait for microtask queue to flush
        allDone = Boolean(strokes.value.every(item => item.done))

        if(allDone){
            setRound(prev => prev + 1)
            containerScale.value = withSpring(0.8)
            containerScale.value = withDelay(400, withSpring(1))
            containerRotation.value = withTiming(containerRotation.value == 360 ? 0 : 360, {duration: 500});


            setTimeout(()=>{
                strokes.value = strokes.value.map(item =>{
                if(item.id == 0){
                    return {...item, active: true, done: false}
                }
                return {...item, done: false}
                })
            }, 2000)
        }
    }

    let props = {round: round, strokeDone: strokeDone, strokes: strokes}

    const components = {
        "a" : <UppercaseA {...props} />,
        "b" : <UppercaseB {...props} />,
    }

    
    const AnimatedText = useAnimatedStyle(()=>{
        return{
            transform: [
                {scale: scale.value},
            ]

        }
    })

    const AnimatedContainer = useAnimatedStyle(()=>{
        return{
            transform: [
                {scale: containerScale.value},
                {rotate: `${containerRotation.value}deg`}
            ]
        }
    })

    const onTextPress = useAnimatedGestureHandler({
        onStart(){
            scale.value = .8;
        },
        onEnd(){
            scale.value = withSpring(1)
        },
        onFail(){
            scale.value = withSpring(1)
        }
    })

    const backOnPress = () =>{
        // playBackSound();
        router.back();
    }


    return (
        <View style={styles.container}>
            <BgSvgComponent />
            <View style={styles.header}>
                <BackButton onPress={backOnPress} />
                <TapGestureHandler onGestureEvent={onTextPress}>
                    <Animated.Text style={[AnimatedText, styles.text]}>{letter.toUpperCase()}</Animated.Text>
                </TapGestureHandler>
            </View>

            <Animated.View style={[AnimatedContainer, styles.letterContainer]}>
                {components[letter]}
            </Animated.View>
            
            <View style={styles.progressBarContainer}>
                <ProgressBar round={round} />
                <Image source={require('../../assets/images/star.png')} resizeMode='contain' style={styles.image} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 75,
        fontFamily: 'VAGRounded',
        color: '#8EE8EB',
        zIndex: 20,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: {width: -3, height: 3},
        textShadowRadius: 30,
        letterSpacing: 30,
        position: 'absolute',
        right: 20,
        top: 0
    },
    header:{
        // borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        position: 'absolute',
        top: 0,
        left: 0
    },
    letterContainer: {
        // borderWidth: 1,
        // borderColor: 'red'
    },
    progressBarContainer: {
        // borderWidth: 1,
        position: 'absolute',
        right: 30,
        bottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '-180deg'}]
    },
    image: {
        position: 'absolute',
        bottom: -30,
        width: 70,
        height: 70,
        transform: [{rotate: '-20deg'}]
    }
 

})

export default Page;
