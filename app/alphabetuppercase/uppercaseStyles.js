import { StyleSheet } from "react-native";

const uppercaseStyles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokes: {
    // borderWidth: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: "hidden"
  },
  point: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#052849',
    height: 32,
    width: 32,
    backgroundColor: '#FEE735',
    overflow: 'visible'
  },
 
})

export default uppercaseStyles;