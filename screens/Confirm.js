import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Confirm({ visible, onBack, onConfirm, userInfo }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <LinearGradient
                colors={['rgba(76, 102, 159, 0.9)', 'rgba(59, 89, 152, 0.9)', 'rgba(25, 47, 106, 0.9)']}
                style={styles.gradientBackground}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.userInfoSection}>
                            <Text style={styles.userInfo}>Name: {userInfo.name}</Text>
                            <Text style={styles.userInfo}>Email: {userInfo.address}</Text>
                            <Text style={styles.userInfo}>Phone Number: {userInfo.phone}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onBack} style={[styles.button, styles.buttonClose]}>
                                <Text style={styles.buttonText}>Go Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onConfirm} style={styles.button}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    )
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfoSection: {
        marginBottom: 20,
        width: '100%',
    },
    userInfo: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 20,
        minWidth: '40%',
    },
    buttonClose: {
        backgroundColor: '#AAAAAA',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});