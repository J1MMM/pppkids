import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { API_URL } from "../context/AuthContext";

const placeHlder = require("../../assets/images/lesson.jpg")

const ReadCard = ({ item }) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
    const [sound, setSound] = useState()
    const navigation = useNavigation();
    const scaleVal = useSharedValue(1)

    const animatedLayer = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleVal.value }]
        }
    })

    const handlePress = () => {
        scaleVal.value = 0.8;
        scaleVal.value = withSpring(1, { damping: 10, stiffness: 100 });

        navigation.navigate('ViewLesson', {
            url: `${API_URL}/view/${item._id}`,
            fileType: item.fileType
        })

    }

    return (
        <Animated.View style={styles.container}>
            <Animated.View style={[styles.shadow, animatedLayer]} />
            <AnimatedPressable style={[styles.listContainer, animatedLayer]} onPress={handlePress}>
                <Image
                    source={placeHlder}
                    resizeMode="cover"
                    style={styles.listImage}
                />
            </AnimatedPressable>
            <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.label]}>{item.title}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'

    },
    listContainer: {
        backgroundColor: '#fff',
        height: 180,
        width: 230,
        maxWidth: 350,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'bold',
        maxWidth: 150
    },

    listImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    shadow: {
        backgroundColor: '#2196F5',
        position: 'absolute',
        height: 180,
        width: 230,
        top: 10,
        left: 0,
        borderRadius: 8
    }
})

export default ReadCard