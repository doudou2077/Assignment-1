import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Start from './screens/Start';
import Confirm from './screens/Confirm';
import Game from './screens/Game';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('START');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleRegister = (userData) => {
    setUserData(userData);
    setCurrentScreen('CONFIRM');

  }

  const renderScree = () => {
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
        return <Game onEnd={() => setCurrentScreen('START')} />;
      default:
        return <Start onRegister={() => setCurrentScreen('CONFIRM')} />
    }
  }

  return (
    <SafeAreaView>
      {renderScree()}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


