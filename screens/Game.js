import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'



export default function Game({ lastDigit, onRestart }) {
    const [guess, setGuess] = useState('');
    const [timer, setTimer] = useState(60);
    const [attempts, setAttempts] = useState(4);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        let interval;
        if (gameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            Alert.alert("Time's up!");
            onRestart();
        }
        return () => clearInterval(interval);
    }, [gameStarted, timer]);

    const handleStart = () => {
        setGameStarted(true);
    }

    const handleGuess = () => {
        if (!guess || isNaN(guess) || guess < 1 || guess > 100) {
            Alert.alert('Invalid input', 'Enter a number between 1 and 100.');
            return;
        }
        if (parseInt(guess) % lastDigit !== 0) {
            setAttempts(attempts - 1);
            if (attempts <= 1) {
                Alert.alert('No more attempts', 'Game over!');
                onRestart();
            } else {
                Alert.alert('Try again', `You have ${attempts - 1} attempts left.`);
            }
        } else {
            Alert.alert('Congratulations', 'You guessed the right number!');
            onRestart();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.instruction}>
                Guess a number between 1 & 100 that is a multiple of {lastDigit}
            </Text>

            <View style={styles.card}>
                {gameStarted ? (
                    <>
                        <TextInput
                            style={styles.input}
                            onChangeText={setGuess}
                            placeholder="Enter your guess"
                            value={guess}
                            keyboardType="numeric"
                        />
                        <Text>Attempts left: {attempts}</Text>
                        <Text>Timer: {timer}s</Text>
                        <Button title="Use a Hint" onPress={() => { }} />
                        <Button title="Submit guess" onPress={handleGuess} />
                    </>
                ) : (
                    <>
                        <Button title="Start" onPress={handleStart} />
                    </>
                )}
            </View>

            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text>Restart</Text>
            </TouchableOpacity>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
        padding: 10,
    },
    restartButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    }
});