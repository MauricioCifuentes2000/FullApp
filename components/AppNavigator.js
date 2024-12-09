import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AddGoal from '../screens/AddGoal';
import GoalsList from '../screens/GoalsList';
import { AuthContext } from '../context/AuthContext';
import Login from '../screens/Login';
import Register from '../screens/Register';  // Importa la pantalla de registro

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// StackNavigator para las pantallas de objetivos
const GoalsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="GoalsList" 
        component={GoalsList} 
        options={{ title: 'Lista de Casos' }} 
      />
      <Stack.Screen 
        name="AddGoal" 
        component={AddGoal} 
        options={{ title: 'Agregar Casos' }} 
      />
    </Stack.Navigator>
  );
};

// DrawerNavigator principal
const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <Drawer.Navigator initialRouteName={userToken ? "Home" : "Login"}>
      {userToken ? (
        <>
          <Drawer.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Inicio' }} 
          />
          <Drawer.Screen 
            name="Goals" 
            component={GoalsStack} 
            options={{ title: 'Lista' }} 
          />
        </>
      ) : (
        <>
          <Drawer.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
          <Drawer.Screen 
            name="Register" 
            component={Register} 
            options={{ headerShown: false }} // No se mostrará en el Drawer
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
