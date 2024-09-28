import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Start from './screens/Start';
import Confirm from './screens/Confirm';
import Game from './screens/Game';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('START');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', lastDigit: null });

  const handleRegister = (userData) => {
    setUserData(userData);
    setCurrentScreen('CONFIRM');

  }

  const handleRestart = () => {
    setCurrentScreen('START');
    setUserData({ name: '', email: '', phone: '', lastDigit: null });
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'START':
        return <Start onRegister={handleRegister} />;
      case 'CONFIRM':
        return <Confirm
          userInfo={userData}
          onConfirm={() => setCurrentScreen('GAME')}
          onBack={() => setCurrentScreen('START')}
        />;
      case 'GAME':
        return <Game
          lastDigit={userData.lastDigit}
          onRestart={handleRestart}
        />;
      default:
        return <Start onRegister={() => setCurrentScreen('CONFIRM')} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
