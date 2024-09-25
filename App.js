import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Start from './screens/Start';
import Confirm from './screens/Confirm';
import Game from './screens/Game';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('START');

  const renderScree = () => {
    switch (currentScreen) {
      case 'START':
        return <Start onRegister={() => setCurrentScreen('CONFIRM')} />;
      case 'CONFIRM':
        return <Confirm onConfirm={() => setCurrentScreen('GAME')}
          onBack={() => setCurrentScreen('START')} />;
      case 'GAME':
        return <Game onEnd={() => setCurrentScreen('START')} />;
      default:
        return <Start onRegister={() => setCurrentScreen('CONFIRM')} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderScree()}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
