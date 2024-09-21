import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox'

export default function start() {
    return (
        <SafeAreaView>
            <View>
                <Text>Name:</Text>
                <TextInput />
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