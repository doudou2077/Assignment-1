import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Game = ({ lastDigit, onRestart }) => {
    const [guess, setGuess] = useState('');
    const [timer, setTimer] = useState(60);
    const [attempts, setAttempts] = useState(4);
    const [gameStarted, setGameStarted] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [hintUsed, setHintUsed] = useState(false);
    const [hintMessage, setHintMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        let interval;
        if (gameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            Alert.alert("Time's up!");
            onRestart();
        }
        return () => clearInterval(interval);
    }, [gameStarted, timer]);

    useEffect(() => {
        setCorrectAnswer(generateCorrectAnswer(lastDigit));
    }, [lastDigit]);

    const handleStart = () => {
        setGameStarted(true);
    };

    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);
        if (!numericGuess || numericGuess < 1 || numericGuess > 100) {
            setFeedback('Enter a number between 1 and 100.');
            setShowFeedback(true);
            return;
        }
        if (numericGuess !== correctAnswer) {
            const direction = numericGuess > correctAnswer ? 'lower' : 'higher';
            setAttempts(prevAttempts => {
                if (prevAttempts <= 1) {
                    setFeedback('No more attempts. Game over!');
                    setShowFeedback(true);
                    onRestart();
                } else {
                    setFeedback(`You did not guess correct! You should guess ${direction}.`);
                    setShowFeedback(true);
                }
                return prevAttempts - 1;
            });
        } else {
            setFeedback('Congratulations! You guessed the right number!');
            setShowFeedback(true);
            onRestart();
        }
        setGuess('');
    };

    const handleHint = () => {
        if (!hintUsed && guess) {
            const direction = parseInt(guess) > correctAnswer ? 'Guess lower!' : 'Guess higher!';
            setHintMessage(direction);
            setHintUsed(true);
        }
    };

    const handleTryAgain = () => {
        setShowFeedback(false);
    };

    const handleEndGame = () => {
        onRestart();
    };

    const generateCorrectAnswer = (lastDigit) => {
        const multiples = Array.from({ length: 100 }, (_, i) => i + 1).filter(i => i % lastDigit === 0);
        return multiples[Math.floor(Math.random() * multiples.length)];
    };

    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>
                Guess a number between 1 & 100 that is a multiple of {lastDigit}
            </Text>

            {showFeedback ? (
                <View style={styles.feedbackCard}>
                    <Text>{feedback}</Text>
                    <Button title="Try Again" onPress={handleTryAgain} />
                    <Button title="End the Game" onPress={handleEndGame} />
                </View>
            ) : (
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
                            {hintMessage && <Text>{hintMessage}</Text>}
                            <Button title="Use a Hint" onPress={handleHint} disabled={hintUsed} />
                            <Button title="Submit guess" onPress={handleGuess} disabled={attempts <= 0} />
                        </>
                    ) : (
                        <Button title="Start" onPress={handleStart} />
                    )}
                </View>
            )}

            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text>Restart</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        backgroundColor: 'lightgrey',
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

export default Game;
