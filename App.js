import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, Button, ScrollView, Pressable } from 'react-native';
import Timer from './Timer';

export default function App() {
  const [ejercicio, setEjercicio] = React.useState('');
  const [descanso, setDescanso] = React.useState('');
  const [rondas, setRondas] = React.useState('');

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text>
          Tiempo de trabajo (segundos)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEjercicio}
          value={ejercicio}
          placeholder="segundos"
          keyboardType="numeric"
        />
        <Text>
          Tiempo de descanso (segundos)
        </Text><TextInput
          style={styles.input}
          onChangeText={setDescanso}
          value={descanso}
          placeholder="segundos"
          keyboardType="numeric"
        />
        <Text>
          Numeros de rondas
        </Text><TextInput
          style={styles.input}
          onChangeText={setRondas}
          value={rondas}
          placeholder="unidades"
          keyboardType="numeric"
        />
        <Timer ejercicio={ejercicio} descanso={descanso} rondas={rondas} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  input: {
    width: 90,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
