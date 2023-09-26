import { Stack } from "expo-router"

export default () =>{
    return (
        <Stack screenOptions={{
            orientation: 'landscape', 
            headerShown: false, 
            statusBarHidden: true,
            navigationBarHidden: true
            }}
            >
            <Stack.Screen name="index" />
            
            <Stack.Screen
            name="[modal]"
            options={{
                presentation: "transparentModal",
                animation:"fade",
                contentStyle: {backgroundColor: 'rgba(0,0,0,0.5)'}
            }}
            
            />
            

        </Stack>
    )
}