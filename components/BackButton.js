import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


const BackButton = ({onPress}) => {
    const handlePress = () =>{
        onPress();
    }

    return (
        <Pressable onPress={handlePress}>
        <View style={styles.container}>
            <FontAwesome name='arrow-left' color='#FFF' size={24} style={styles.icon} />
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F71C62',
        borderRadius: 100,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 10,

    },
    icon: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginLeft: -3,
        marginTop: -3
    }
})

export default BackButton;
