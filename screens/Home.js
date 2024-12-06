import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { AuthContext } from '../context/AuthContext';

const Home = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función logout
      Alert.alert('Éxito', 'Has cerrado sesión correctamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cerrar sesión');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido al Gestor de OKR</Text>
        <AppButton 
          title="Ir a Agregar Objetivo" 
          onPress={() => navigation.navigate('Goals', { screen: 'AddGoal' })} 
        />
        <AppButton 
          title="Ir a Lista de Objetivos" 
          onPress={() => navigation.navigate('Goals', { screen: 'GoalsList' })} 
        />
        <AppButton 
          title="Cerrar Sesión" 
          onPress={handleLogout} 
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000', 
  },
});

export default Home;
