import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from './colors';

const GradientBackground = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
                style={styles.background}
            />
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    content: {
        flex: 1,
    },
});

export default GradientBackground;