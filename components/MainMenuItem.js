import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Image } from "react-native";
import { Audio } from 'expo-av'
import { useEffect, useState } from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";

const windowHeight = Dimensions.get('window').height;
const containerHeight = windowHeight * 0.5;

// Preload the sound
const soundObject = new Audio.Sound();
soundObject.loadAsync(require('../assets/audio/selected.wav'));

// Play the sound synchronously
function playSelectedSound() {
  soundObject.replayAsync();
}

const MainMenuItems = ({id, viewableItems, group, subject, title, modalData, url}) =>{
    const router = useRouter();
    // states 
    const scaleVal = useSharedValue(1)
    const placeHlder = require("../assets/images/papumba.png")

    const borderColor = {
        "reading": "#4CB04D", //green
        "math": "#F54337", //red
        "writing": "#2196F5" //blue
    }
    const subjectSymbol = {
        "math": require("../assets/images/math-symbol.png"), 
        "reading": require("../assets/images/abc-symbol.png"), 
        "writing": require("../assets/images/writing-symbol.png") 
    }

    // animated styles 
    const rStyle = useAnimatedStyle(()=>{
        const isViewable = Boolean(viewableItems.value
        .filter((item)=> item.isViewable)
        .find((items)=> items.index == id))
        return{
            transform: [{scale: withTiming(isViewable ? 1 : .6, {duration:200})}],
            opacity: withTiming(isViewable ? 1 : 0, {duration:200}),
        }
    })
    // pop on click 
    const animatedLayer = useAnimatedStyle(()=>{
        return{
            transform: [{scale: scaleVal.value}, {rotate: '-9deg'}]
        }
    })

    const handlePress = () =>{
        scaleVal.value = 0.8;
        scaleVal.value = withSpring(1, {damping: 10, stiffness: 100 });
        if(group == true ){
            router.push(`/${id}?title=${title}&modalData=${modalData}`);
        }else{
            router.push(url);
        }
        playSelectedSound();
    }
   
    
    return(
        <Animated.View style={[rStyle, styles.container]}>
            <Animated.View style={[styles.layers, {backgroundColor: group ? '#E0E0E0' : 'rgba(0,0,0,0)'}, animatedLayer]}>
                <View style={[styles.layers, {transform: [{rotate: '3deg'}], backgroundColor: group ? '#EDEEE5' : 'rgba(0,0,0,0)'}]}>
                    <View style={[styles.layers, {transform: [{rotate: '3deg'}], backgroundColor: group ? '#FFF' : 'rgba(0,0,0,0)'}]}>
                        <Pressable style={[styles.listContainer, {borderColor: borderColor[subject]}]} onPress={handlePress}>
                            <Image 
                                source={placeHlder} 
                                resizeMode="cover" 
                                style={styles.listImage} 
                                />
                            <View style={[styles.subjectBadge, {backgroundColor: borderColor[subject]}]}>
                                <Image 
                                    source={subjectSymbol[subject]} 
                                    style={styles.subjectSymbol} 
                                    resizeMode="contain"
                                    />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
            <Text style={[styles.label]}>{title}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    layers: {
        // borderWidth: 1,
        borderRadius: 10,
    },
    listContainer: {
        backgroundColor: '#fff', 
        borderWidth: 5,
        height: containerHeight,
        width: containerHeight+50,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '3deg'}],
    },
    label: {
        marginTop: 25,
        fontSize: 18,
        maxWidth: containerHeight+50,
        textAlign: 'center',
        color: '#3C3C57',
        fontFamily: 'VAGRounded'
    },
    subjectBadge: {
        width: 45,
        height: 45,
        position: "absolute",
        bottom: 0,
        left: 0,
        borderTopRightRadius: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5
    },
    subjectSymbol: {
        width: 24,
        height: 24,
        tintColor: 'white'

    },
    listImage: {
        width: '100%',
        height: '100%'
    }
})

export default MainMenuItems