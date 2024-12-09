import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import Navbar from '../components/Navbar';
import ScreenWrapper from '../components/ScreenWrapper';
import axios from 'axios';
import { API_URL } from '../config/Config';
import { AuthContext } from '../context/AuthContext';
import AppButton from '../components/AppButton'; // Componente para los botones

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const { userToken, username, password } = useContext(AuthContext); // Asumiendo que tienes el username y password en el contexto
  const [selectedGoal, setSelectedGoal] = useState(null); // Para almacenar el goal seleccionado
  const [isModalVisible, setIsModalVisible] = useState(false); // Para manejar la visibilidad del modal

  // Función para obtener los goals
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
        Alert.alert('Error', 'No se pudieron obtener los Objeto');
      }
    } catch (error) {
      console.error('Error al obtener los Objeto:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los Objeto');
    }
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeDeleteModal = () => {
    setIsModalVisible(false);
    setSelectedGoal(null);
  };

  // Función para eliminar un goal
  const deleteGoal = async () => {
    try {
      // Verificamos si el token es válido antes de hacer la petición
      if (!userToken) {
        Alert.alert('Error', 'Token de autenticación no encontrado');
        return;
      }

      const response = await axios.delete(`${API_URL}/deleteUserGoal`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Aseguramos que el token esté en el encabezado
        },
        data: {
          username: username, // El username debe provenir del contexto
          password: password, // La contraseña también debe ser la correcta desde el contexto
          goal_id: selectedGoal._id, // Usamos el ID del objetivo
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Objeto eliminado exitosamente');
        fetchGoals(); // Actualiza la lista de goals
        closeDeleteModal(); // Cierra el modal
      } else {
        Alert.alert('Error', response.data.msg || 'Hubo un problema al eliminar el objeto');
      }
    } catch (error) {
      console.error('Error al eliminar el Objeto:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el Objeto');
    }
  };

  // Fetch goals al montar el componente
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <ScreenWrapper>
      <Navbar title="Lista de Casos" />
      <FlatList
        data={goals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDeleteModal(item)}>
            <View style={styles.goal}>
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.what_to_do}</Text>
              <Text>{item.how_much_to_do}</Text>
              <Text>{item.check_date}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal para eliminar un goal */}
      {selectedGoal && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeDeleteModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¿Eliminar Objeto?</Text>
            <Text>Estás a punto de eliminar el objeto: {selectedGoal.title}</Text>

            <View style={styles.modalActions}>
              <AppButton title="Eliminar" onPress={deleteGoal} />
              <AppButton title="Cancelar" onPress={closeDeleteModal} />
            </View>
          </View>
        </Modal>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    marginTop: 20,
  },
});

export default GoalsList;
