import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";


export default function Timer(data) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ejercicio, setEjercicio] = useState(null)
  const [descanso, setDescanso] = useState(null)
  const [rondas, setRondas] = useState(null)

  useEffect(() => {
    setEjercicio(data.ejercicio)
    setDescanso(data.descanso)
    setRondas(data.rondas)
  }, [modalVisible])


  useEffect(() => {
    if (descanso >= 0) {
      ejercicio > 0 && setTimeout(() => setEjercicio(ejercicio - 1), 1000);
    }
    if (ejercicio <= 0) {
      descanso > 0 && setTimeout(() => setDescanso(descanso - 1), 1000);
    }
    if (ejercicio == 0 && descanso == 0 && rondas >= 1) {
      setEjercicio(data.ejercicio)
      setDescanso(data.descanso)
      setRondas(rondas - 1)
    }

  }, [ejercicio, descanso]);

  NotificationSounds.getNotifications('notification').then(soundsList => {
    console.warn('SOUNDS', JSON.stringify(soundsList))
    playSampleSound(soundsList[1]);
  });
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {

                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>X</Text></Pressable>

            {rondas == 0 ? <>
              <Text style={styles.modalText}>FINISHED !!!</Text></>
              : <>
                <Text style={styles.modalText}>{rondas > 1 ? `Estas en la ${rondas}a ronda` : 'Ultima ronda !!'}</Text>

                <Text style={styles.counter}>EJERCICIO : {ejercicio} segundos </Text>
                <Text style={styles.counter}>DESCANSO : {descanso} segundos </Text></>
            }
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Empezar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "red",
    alignSelf: "flex-end",
    marginTop: -80

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  }
  , counter: {
    fontSize: 20
  }
});
