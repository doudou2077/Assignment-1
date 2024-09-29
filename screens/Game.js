
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import GradientBackground from './GradientBackground';

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
    const [hasWon, setHasWon] = useState(false);
    const [totalAttemptsUsed, setTotalAttemptsUsed] = useState(0);
    const [endReason, setEndReason] = useState('');

    useEffect(() => {
        let interval;
        if (gameStarted && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && gameStarted) {
            setEndReason('time');
            setGameStarted(false); // Prevent further guesses
        }
        return () => clearInterval(interval);
    }, [gameStarted, timer]);

    useEffect(() => {
        const answer = generateCorrectAnswer(lastDigit);
        setCorrectAnswer(answer);
        console.log(`Generated Correct Answer: ${answer}`); // For testing purposes
    }, [lastDigit]);

    const handleStart = () => {
        setGameStarted(true);
        setHasWon(false);
        setTotalAttemptsUsed(0);  // Reset the total attempts used
        setAttempts(4);           // Reset attempts
        setTimer(60);             // Reset timer
        setShowFeedback(false);   // Hide feedback
        setHintUsed(false);       // Reset hint usage
        setHintMessage('');       // Clear hint message
        setEndReason('');
        const newAnswer = generateCorrectAnswer(lastDigit);
        setCorrectAnswer(newAnswer);
        console.log(`New Game Started, Correct Answer: ${newAnswer}`);
    };

    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);
        if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
            Alert.alert(
                "Invalid Input",
                "Please enter a number between 1 and 100.");
            setGuess('');
            return;
        } else {
            setTotalAttemptsUsed(prevAttemptsUsed => prevAttemptsUsed + 1);

            if (numericGuess === correctAnswer) {
                setHasWon(true);
                setFeedback(`Congratulations! Your guessed the number in ${totalAttemptsUsed + 1} attempts.`);
                setShowFeedback(true); // Optionally show feedback here if you want
            } else {
                setAttempts(prev => prev - 1);
                if (attempts <= 1) {
                    setEndReason('attempts');
                    setGameStarted(false);
                } else {
                    setFeedback(`You did not guess correct! You should guess ${numericGuess < correctAnswer ? 'higher' : 'lower'}.`);
                }
            }
            setShowFeedback(true);
            setGuess('');
        }
    };

    const handleHint = () => {
        if (!hintUsed && guess) {
            const direction = parseInt(guess, 10) > correctAnswer ? 'Guess lower!' : 'Guess higher!';
            setHintMessage(direction);
            setHintUsed(true); // Disables further use of the hint
        }
    };

    const generateCorrectAnswer = (lastDigit) => {
        const multiples = Array.from({ length: 100 }, (_, i) => i + 1).filter(i => i % lastDigit === 0);
        return multiples[Math.floor(Math.random() * multiples.length)];
    };

    const handleEndGame = () => {
        setEndReason('manual');
        setGameStarted(false);
    };

    if (hasWon) {
        return (
            <View style={styles.container}>
                <View style={styles.winGameCard}>
                    <Text>{`Congratulations! You guessed the number in ${totalAttemptsUsed} attempts.`}</Text>
                    <Image source={{ uri: `https://picsum.photos/id/${correctAnswer}/100/100` }} style={styles.image} />
                    <Button title="New Game" onPress={handleStart} />
                </View>
            </View>
        );
    }

    if (endReason) {
        return (
            <View style={styles.container}>
                <View style={styles.endGameCard}>
                    {endReason === 'manual' ? (
                        <Text>The game is over</Text>
                    ) : endReason === 'time' ? (
                        <Text>You are out of time!</Text>
                    ) : (
                        <Text>You are out of attempts!</Text>
                    )}
                    <Image
                        source={require('./images.jpeg')}
                        style={styles.emojiImage}
                    />
                    <Button title="New Game" onPress={handleStart} />
                </View>
            </View>
        );
    }

    return (
        <GradientBackground>
            <View style={styles.container}>
                {!showFeedback ? (
                    <View style={styles.card}>
                        <Text style={styles.instructions}>Guess a number between 1 & 100 that is a multiple of {lastDigit}</Text>
                        {!gameStarted ? (
                            <Button title="Start Game" onPress={handleStart} />
                        ) : (
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
                                {hintMessage && <Text style={styles.hintMessage}>{hintMessage}</Text>}
                                <Button title="Use a Hint" onPress={handleHint} disabled={hintUsed} />
                                <Button title="Submit guess" onPress={handleGuess} disabled={attempts <= 0} />
                            </>
                        )}
                    </View>
                ) : (
                    <View style={styles.feedbackCard}>
                        <Text>{feedback}</Text>
                        <Button title="Try Again" onPress={() => setShowFeedback(false)} />
                        <Button title="End the Game" onPress={handleEndGame} />
                    </View>
                )}

                <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                    <Text>Restart</Text>
                </TouchableOpacity>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    winGameCard: {
        backgroundColor: '#99ccff',
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

    endGameCard: {
        backgroundColor: 'black',
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
        borderBottomWidth: 1,
        borderColor: '#ccc',
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
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    hintMessage: {
        fontSize: 14,
        color: 'red',
        padding: 10,
    }
});

export default Game;


