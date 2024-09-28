import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'



export default function Game() {
    const [guess, setGuess] = useState('');
    const [timer, setTimer] = useState(60);
    const [attempts, setAttemps] = useState(4);
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


    return (
        <View>
            <Text>
                Guess a number between 1 & 100 that is a multiple of {lastDigit}
            </Text>

            <View>
                {gameStarted ? (
                    <>
                        <TextInput
                            onChangeText={setGuess}
                            placeholder="Enter your guess"
                            value={guess}
                            keyboardType="numeric"
                        />
                        <Text>Attempts left: {attempts}</Text>
                        <Tetx>Timer: {timer}s</Tetx>
                        <Button title="Use a Hint" onPress={() => { }} />
                        <Button title="Submit guess" onPress={handleGuess} />
                    </>
                ) : (
                    <>
                        <Button title="Start" onPress={handleStart} />
                    </>
                )}
            </View>

            <TouchableOpacity onPress={onRestart}>
                <Text>Restart</Text>
            </TouchableOpacity>
        </View>
    )


}