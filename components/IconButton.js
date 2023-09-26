import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const IconButton = ({iconName, iconColor, label}) => {
    return (
        <Pressable style={styles.container} onPress={()=>console.log("parent button clicked")}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
          </View>          
          <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#3D3D59',
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    minHeight: 40,
    gap: 5
    
  },

  text: {
    color: '#fff', 
    fontFamily: 'VAGRounded', 
    fontSize:14, 
    paddingRight: 10
  },
  iconWrap:{
    borderColor: '#F4E653',
    borderWidth: 2,
    backgroundColor: '#FFF',
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default IconButton;


