import { useRouter, useSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import {View, StyleSheet, Text, Button, Dimensions, FlatList, ImageBackground} from 'react-native';
import {GestureDetector, PanGestureHandler, TouchableWithoutFeedback} from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { snapPoint } from "react-native-redash";
import MainMenuItems from '../components/MainMenuItem';
import ModalItem from '../components/ModalItem';
import AlphabetUppercase from '../data/AlphabetUppercase';
import BackButton from '../components/BackButton';
import { Audio } from 'expo-av';

// Preload the sound
const soundObject = new Audio.Sound();
const soundObject1 = new Audio.Sound();
soundObject.loadAsync(require('../assets/audio/back.wav'));
soundObject1.loadAsync(require('../assets/audio/select.wav'));

// Play the sound synchronously
function playBackSound() {
  soundObject.replayAsync();
}

function playScrollSound() {
  soundObject1.replayAsync();
}


const windowHeight = Dimensions.get('window').height;
const containerHeight = windowHeight * 0.8; 
const side = (windowHeight + containerHeight + 100)/2;
const SNAP_POINTS = [-side, 0, side]

const MenuModal = () => {
    const y = useSharedValue(0);
    const bottom = useSharedValue('-80%');
    const router = useRouter();
    const {modalData, title} = useSearchParams();


    const listData = {
        "upper_case_alphabet" : AlphabetUppercase
    }
    

    const containerStyle = useAnimatedStyle(()=>{
        return{
            bottom: bottom.value,
            transform: [
                {translateY: y.value},
            ],
        }
    })
    // slide up animation 
    useEffect(()=>{
        bottom.value = withDelay(0,withTiming('0'));
    },[])
    
    // close modal function 
    const closeModal = () => {
        // playBackSound();
        y.value = withTiming(side)

        const timeout = setTimeout(()=>{
            router.back();
        }, 200)

        return () => clearTimeout(timeout)
    }

    if(listData[modalData] == undefined){
        return (
            <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            
            <Animated.View style={[containerStyle, styles.container]}>
                <View style={styles.header} >
                    <BackButton onPress={closeModal} />
                    <Text style={[styles.title]}>List Empty</Text>
                </View>
            </Animated.View>
        </View>
        )
    }
    
    
    return (
        <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            
            <Animated.View style={[containerStyle, styles.container]}>
                <View style={styles.header} >
                    <BackButton onPress={closeModal} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                
                <FlatList 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'flex-start'}}
                    data={listData[modalData]}  
                    overScrollMode='never'
                    horizontal
                    // onScrollBeginDrag={playScrollSound}
                    renderItem={({item}) => {
                        return <ModalItem url={item.url} />
                    }} 
                    />

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: containerHeight,
        backgroundColor: '#91CBF9',
        position: 'absolute',
        borderTopEndRadius: 20, 
        borderTopStartRadius: 20,
       
    },
    header: {
        // borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
         padding: 20,
    },
    title: {
        color: '#3D3D59',
        fontSize: 26,
        fontFamily: 'VAGRounded',
    },
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '100%',
        width: '100%'
    },
})

export default MenuModal;
