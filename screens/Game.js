import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function Game({ lastDigit, onRestart }) {
    const [guess, setGuess] = useState('');
    const [timer, setTimer] = useState(60);
    const [attempts, setAttempts] = useState(4);
    const [gameStarted, setGameStarted] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        let interval;
        if (gameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            Alert.alert("Time's up!");
            onRestart();
        }
        return () => clearInterval(interval);
    }, [gameStarted, timer]);

    const handleStart = () => {
        setGameStarted(true);
        setCorrectAnswer(generateCorrectAnswer(lastDigit));
    };

    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);
        if (!numericGuess || numericGuess < 1 || numericGuess > 100) {
            Alert.alert('Invalid input', 'Enter a number between 1 and 100.');
            return;
        }
        if (numericGuess !== correctAnswer) {
            setAttempts(prevAttempts => {
                if (prevAttempts <= 1) {
                    Alert.alert('No more attempts', 'Game over!');
                    onRestart();
                    return prevAttempts;
                }
                return prevAttempts - 1;
            });
            setFeedback(`You should guess ${numericGuess < correctAnswer ? 'higher' : 'lower'}.`);
            setShowFeedback(true);
        } else {
            Alert.alert('Congratulations', 'You guessed the right number!');
            onRestart();
        }
        setGuess('');
    };

    const generateCorrectAnswer = (lastDigit) => {
        const multiples = [];
        for (let i = 1; i <= 100; i++) {
            if (i % lastDigit === 0) multiples.push(i);
        }
        return multiples[Math.floor(Math.random() * multiples.length)];
    };

    const handleTryAgain = () => {
        setShowFeedback(false);
    };

    const handleEndGame = () => {
        onRestart();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>
                Guess a number between 1 & 100 that is a multiple of {lastDigit}
            </Text>

            {!showFeedback && (
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
                            <Button title="Submit guess" onPress={handleGuess} disabled={!gameStarted || attempts <= 0} />
                        </>
                    ) : (
                        <Button title="Start" onPress={handleStart} />
                    )}
                </View>
            )}

            {showFeedback && (
                <View style={styles.feedbackCard}>
                    <Text>{feedback}</Text>
                    <Button title="Try Again" onPress={handleTryAgain} />
                    <Button title="End the Game" onPress={handleEndGame} />
                </View>
            )}

            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text>Restart</Text>
            </TouchableOpacity>
        </View>
    );
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
    feedbackCard: {
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
        marginTop: 20,
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
