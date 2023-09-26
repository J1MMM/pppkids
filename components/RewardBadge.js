import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const RewardBadge = ({imgSrc, label}) => {
    return (
        <View style={styles.container}>
          <Image source={imgSrc} resizeMode='contain' style={styles.image} />
          <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#3D3D59',
    borderRadius: 20,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 40,
    gap: 5
    
  },

  text: {
    color: '#fff', 
    fontFamily: 'VAGRounded', 
    fontSize:14, 
    paddingRight: 10
  },

  image: {
    width: 32,
    height: 32,
    marginBottom: -3
  }
})

export default RewardBadge;


