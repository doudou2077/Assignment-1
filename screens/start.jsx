import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'

export default function start() {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState('')

    const handleNameChange = (text) => {
        const characters = text.split('');
        const containsDigit = characters.some(char => '0123456789'.includes(char));

        if (text.length <= 1 || containsDigit) {
            setNameError('Please enter a valid name');
        } else {
            setNameError('');
        }
        setName(text);
    };

    const handleEmailChange = (email) => {
        const atIndex = email.indexOf('@');
        const lastAtIndex = email.lastIndexOf('@');
        const dotComIndex = email.lastIndexOf('.com');
        if (atIndex === lastAtIndex && atIndex > 0 && dotComIndex > atIndex + 1 && dotComIndex === email.length - 4) {
            setAddressError('');
        } else {
            setAddressError('Please enter a valid email address');
        }
        setAddress(email);
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Name:</Text>
                <TextInput
                    placeholder=''
                    value={name}
                    onChangeText={handleNameChange}
                />
                {nameError ? <Text>{nameError}</Text> : null}
            </View>

            <View>
                <Text>Email Address:</Text>
                <TextInput
                    placeholder=''
                    value={address}
                    onChangeText={handleEmailChange}
                />
                {addressError ? <Text>{addressError}</Text> : null}
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