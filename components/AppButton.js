import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../config/colors'

export default function AppButton({ title, color = "primary", width ='100%', onPress }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color], width }]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.primary,
        marginVertical: 10
    },
    text: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.white
    }
})
