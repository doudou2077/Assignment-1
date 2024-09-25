import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'

export default function Start() {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')

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
        const dotComIndex = email.lastIndexOf('.');
        if (atIndex === lastAtIndex && atIndex > 0 && dotComIndex > atIndex + 1 && dotComIndex < email.length - 1) {
            setAddressError('');
        } else {
            setAddressError('Please enter a valid email address');
        }
        setAddress(email);
    };

    const handlePhoneChange = (phone) => {
        const isNumericandValidLength = phone.length === 10 && phone.split('').every(char => '0123456789'.includes(char));
        const isValidLastCharacter = !['0', '1'].includes(phone[phone.length - 1]);
        if (isNumericandValidLength && isValidLastCharacter) {
            setPhoneError('');
        } else {
            setPhoneError('Please enter a valid phone number');
        }
        setPhone(phone);
    }

    const [isChecked, setIsChecked] = useState(false);

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
                <TextInput
                    placeholder=''
                    value={phone}
                    onChangeText={handlePhoneChange}
                />
                {phoneError ? <Text>{phoneError}</Text> : null}
            </View>

            <View>
                <Checkbox
                    value={isChecked}
                    onValueChange={setIsChecked}

                />
            </View>

            <View>
                <Button title="Reset" />
                <Button title="Register" disabled={!isChecked} />
            </View>

        </SafeAreaView>
    );
}