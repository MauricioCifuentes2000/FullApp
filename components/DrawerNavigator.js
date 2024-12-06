import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home'; // Asegúrate de esta importación
import GoalsList from '../screens/GoalsList';
import AddGoal from '../screens/AddGoal';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Drawer.Screen name="Goals" component={GoalsList} options={{ title: 'Goals List' }} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
