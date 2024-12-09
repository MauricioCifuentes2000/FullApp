import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import axios from 'axios';
import { API_URL } from '../config/Config'; // Define la URL de tu API aquí

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Registro exitoso, por favor inicie sesión');
        navigation.navigate('Login'); // Redirige al Login después del registro exitoso
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.msg || 'Hubo un problema con el registro.');
      } else {
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
      />
      <AppButton title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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

export default Register;
