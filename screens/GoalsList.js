import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import Navbar from '../components/Navbar';
import ScreenWrapper from '../components/ScreenWrapper';
import axios from 'axios';
import { API_URL } from '../config/Config';
import { AuthContext } from '../context/AuthContext';

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const { userToken } = useContext(AuthContext);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/getUserGoals`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Incluye el token en el encabezado
        },
      });

      if (response.status === 200) {
        setGoals(response.data.goals);
      } else {
        Alert.alert('Error', 'No se pudieron obtener los objetivos');
      }
    } catch (error) {
      console.error('Error al obtener los objetivos:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los objetivos');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <ScreenWrapper>
      <Navbar title="Lista de Objetivos" />
      <FlatList
        data={goals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.goal}>
            <Text style={styles.goalTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  goal: {
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GoalsList;
