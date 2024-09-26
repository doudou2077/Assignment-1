import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Confirm({ visible, onBack, onConfirm, userInfo }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View>
                <View>
                    <View>
                        <Text>Name:{userInfo.name}</Text>
                        <Text>Email:{userInfo.email}</Text>
                        <Text>Phone Number:{userInfo.phone}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={onBack}>
                            <Text>Go Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}