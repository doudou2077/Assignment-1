import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'

export default function start() {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    const handleNameChage = (text) => {
        const characters = text.split('');
        const containsDigit = characters.some(char => '0123456789'.includes(char));

        if (text.lenghth <= 1 || containsDigit) {
            setNameError('Please enter a valid name');
        } else {
            setNameError('');
        }
        setName(text);
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Name:</Text>
                <TextInput
                    placeholder=''
                    value={name}
                    onChangeText={handleNameChage}
                />
                {nameError ? <Text>{nameError}</Text> : null}
            </View>

            <View>
                <Text>Email Address:</Text>
                <TextInput />
            </View>

            <View>
                <Text>Phone Number:</Text>
                <TextInput />
            </View>

            <View>
                <Checkbox />
            </View>

            <View>
                <Button title="Reset" />
                <Button title="Register" />
            </View>

        </SafeAreaView>
    );
}