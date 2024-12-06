import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config/Config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  // Recuperar el token desde el almacenamiento local si ya existe
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) setUserToken(token);
    };
    getToken();
  }, []);

  // Al hacer login, guardar el token
// Actualiza el método login
const login = async (email, password) => {
  try {
    // Realiza una solicitud al endpoint de login en el backend
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Si el login es exitoso, obtiene el token
    const { access_token } = response.data;

    // Guarda el token en el estado y en AsyncStorage
    setUserToken(access_token);
    await AsyncStorage.setItem('userToken', access_token);

    // Establece el token en las cabeceras predeterminadas de Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  } catch (error) {
    console.error('Error durante el login:', error);
    throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
  }
};


  // Al hacer logout, eliminar el token
  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    delete axios.defaults.headers.common['Authorization']; // Eliminamos el token de las cabeceras de Axios
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
