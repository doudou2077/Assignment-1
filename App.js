import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Start from './screens/Start';
import ConfirmModal from './screens/Confirm';
import Game from './screens/Game';

export default function App() {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', lastDigit: null });
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleRegister = (userData) => {
    setUserData(userData);
    setIsConfirmModalVisible(true);
  }

  const handleConfirm = () => {
    setIsConfirmModalVisible(false);
    setIsGameStarted(true);
  }

  const handleBack = () => {
    setIsConfirmModalVisible(false);
  }

  const handleRestart = () => {
    setIsGameStarted(false);
    setUserData({ name: '', email: '', phone: '', lastDigit: null });
  }

  return (
    <View style={styles.container}>
      {!isGameStarted ? (
        <>
          <Start onRegister={handleRegister} />
          <ConfirmModal
            visible={isConfirmModalVisible}
            userInfo={userData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        </>
      ) : (
        <Game
          lastDigit={userData.lastDigit}
          onRestart={handleRestart}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});