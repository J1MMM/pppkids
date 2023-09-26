import { Link, Navigator, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, FlatList, LogBox } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useRef } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';
import { useSharedValue } from "react-native-reanimated";
import IconButton from "../components/IconButton";
import RewardBadge from "../components/RewardBadge";
import LessonList from "../data/LessonList";
import MainMenuItems from "../components/MainMenuItem";
import BackgroundMusic from "../components/BackgroundMusic";


LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// images 
const starIcon = require("../assets/images/star.png")
const bgImage = require("../assets/images/background.jpg")
// Preload the sound
const soundObject = new Audio.Sound();
soundObject.loadAsync(require('../assets/audio/select.wav'));

// Play the sound synchronously
function playScrollSound() {
  soundObject.replayAsync();
}

export default function Page() {
  //shared value
  const viewableItems = useSharedValue([])
  // function for hiding navigation bar 
  const useStickyImmersiveReset = function() {
    const visibility = NavigationBar.useVisibility();
    useEffect(() => {
      if (visibility === "visible") {
        NavigationBar.setVisibilityAsync("hidden");
      }
    }, [visibility]);
  }();
  // defining custom fonts 
  const [fontsLoaded] = useFonts({
    "VAGRounded": require("../assets/fonts/VAGRoundedStd-Black.otf"),
  });
  // display splash screen when font not ready 
  useEffect(()=>{
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare()
  }, [])
  // function for viewable items change 
  const onViewableItemsChanged = (info) => {
    viewableItems.value = info.viewableItems
  };
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);

  // hide splash screen when font is ready NOTE: It required always at the bottom of all function idk
  if(!fontsLoaded){
    return undefined
  }else{
    SplashScreen.hideAsync();
  }
  console.log("render");
  return (
    <View style={styles.container}>
       <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.header}>
          <IconButton 
            iconName="human-male-child"
            bgColor="'#3D3D59"
            iconColor="#3D3D59"
            textColor="#FFF"
            label="Parents"
          />
          <RewardBadge
            imgSrc={starIcon}
            label={295}
          />
        </View>
        <FlatList 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          data={LessonList}  
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          overScrollMode='never'
          horizontal
          onScrollBeginDrag={playScrollSound}
          renderItem={({item}) => {
            return <MainMenuItems 
              key={item.id} 
              id={item.id}  
              viewableItems={viewableItems} 
              group={item.group}
              subject={item.subject}
              title={item.title}
              modalData={item.modalData}
              url={item.url}
              />
          }} 
          />
       </ImageBackground>
      {/* <BackgroundMusic /> */}
      <StatusBar style="auto" hidden translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBDBFF',
  },
  bgImage:{
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    // borderWidth: 1,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  
});
