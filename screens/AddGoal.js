import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import Navbar from '../components/Navbar';
import ScreenWrapper from '../components/ScreenWrapper';
import axios from 'axios';
import { API_URL } from '../config/Config';
import { AuthContext } from '../context/AuthContext';

const AddGoal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    what_to_do: '',
    how_much_to_do: '',
    check_date: '',
  });
  const { userToken } = useContext(AuthContext);

  const handleSaveGoal = async () => {
    try {
      const response = await axios.post(`${API_URL}/addGoal`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Incluye el token en el encabezado
        },
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Objetivo guardado correctamente');
        setFormData({
          title: '',
          description: '',
          what_to_do: '',
          how_much_to_do: '',
          check_date: '',
        });
      } else {
        Alert.alert('Error', 'No se pudo guardar el objetivo');
      }
    } catch (error) {
      console.error('Error al guardar el objetivo:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el objetivo');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Navbar title="Agregar Objetivo" />
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="¿Qué hacer?"
          value={formData.what_to_do}
          onChangeText={(text) => setFormData({ ...formData, what_to_do: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="¿Cuánto hacer?"
          value={formData.how_much_to_do}
          onChangeText={(text) => setFormData({ ...formData, how_much_to_do: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de revisión"
          value={formData.check_date}
          onChangeText={(text) => setFormData({ ...formData, check_date: text })}
        />
        <AppButton title="Guardar Objetivo" onPress={handleSaveGoal} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddGoal;
