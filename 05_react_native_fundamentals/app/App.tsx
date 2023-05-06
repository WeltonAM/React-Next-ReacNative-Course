/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  function handleMudaNome() {
    setName('Linda');
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>Juliana</Text>
      <Text style={[styles.title, styles.text]}>Karla</Text>
      <Text>{name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleMudaNome}>
        <Text>Toque aqui!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
  },

  title: {
    fontSize: 32,
    color: '#121212',
    fontWeight: 'bold',
  },

  text: {
    color: '#aaa',
  },

  button: {
    backgroundColor: 'magenta',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
