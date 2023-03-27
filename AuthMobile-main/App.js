
import React, { useContext } from 'react'
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/theme';
import { 
StartScreen,
LoginScreen, 
RegisterScreen,
ResetPasswordScreen,
Dashboard,
} from './src/screens/'

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator        
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >

          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
