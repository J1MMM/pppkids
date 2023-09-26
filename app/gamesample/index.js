import { useSearchParams } from 'expo-router';
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const Page = () => {
    const params = useSearchParams()

    return (
        <View style={{flex: 1}}>
            <Image source={require('../../assets/splash.jpg')} resizeMode='contain' style={{width: '100%', height: '100%'}} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Page;
