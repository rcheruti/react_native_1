import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navRef, Paginas } from './src/Util';

import { Home } from './src/paginas/Home';
import { Formulario } from './src/paginas/Formulario';
import { Pan } from './src/paginas/Pan';

import Ionicons from 'react-native-vector-icons/Ionicons';

function icon(name: string) {
  return ({ focused, color, size }: any) => {
    return <Ionicons name={name} size={size} color={color} />;
  };
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer ref={ navRef }>
      <Tab.Navigator initialRouteName="Home" backBehavior="history">
        <Tab.Screen name={ Paginas.Home.toString() } component={ Home } options={ { title: 'Home', tabBarIcon: icon('ios-home') } } />
        <Tab.Screen name={ Paginas.Formulario.toString() } component={ Formulario } options={ { title: 'Formulário', tabBarIcon: icon('ios-document') } } />
        <Tab.Screen name={ Paginas.Pan.toString() } component={ Pan } options={ { title: 'Pan', tabBarIcon: icon('ios-document') } } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

