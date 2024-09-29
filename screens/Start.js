import { View, Text, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import GradientBackground from './GradientBackground';



export default function Start({ onRegister }) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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
        if (email.indexOf('@') > 0 && email.indexOf('@') === email.lastIndexOf('@') && email.lastIndexOf('.') > email.indexOf('@') + 1 && email.lastIndexOf('.') < email.length - 1) {
            setAddressError('');
        } else {
            setAddressError('Please enter a valid email address');
        }
        setAddress(email);
    };

    const handlePhoneChange = (phone) => {
        if (phone.length === 10 && phone.split('').every(char => '0123456789'.includes(char)) && !['0', '1'].includes(phone[phone.length - 1])) {
            setPhoneError('');
        } else {
            setPhoneError('Please enter a valid phone number');
        }
        setPhone(phone);
    };

    const resetForm = () => {
        setName('');
        setAddress('');
        setPhone('');
        setIsChecked(false);
    };

    const handleRegister = () => {
        if (!nameError && !addressError && !phoneError && name && address && phone && isChecked) {
            const lastDigit = parseInt(phone[phone.length - 1], 10);
            onRegister({ name, address, phone, lastDigit });
        } else {
            Alert.alert('Check the input values');
        }
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <Text style={styles.title}> WELCOME </Text>
                <View style={styles.card}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={handleNameChange}
                    />
                    {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

                    <Text style={styles.label}>Email Address:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={address}
                        onChangeText={handleEmailChange}
                    />
                    {addressError ? <Text style={styles.error}>{addressError}</Text> : null}

                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        value={phone}
                        onChangeText={handlePhoneChange}
                    />
                    {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>I am not a robot</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Reset" onPress={resetForm} />
                        <Button title="Register" onPress={handleRegister} disabled={!isChecked} />
                    </View>
                </View>
            </View>
        </GradientBackground>

    );
}


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    title: {
        fontVariants: 'oldstyle-nums',
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'lightblue',
    },

    container: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '70%',
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 3,
        shadowRadius: 6,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    checkbox: {
        marginRight: 8,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
