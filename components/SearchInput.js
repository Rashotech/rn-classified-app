import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import defaultStyles from '../config/styles'

export default function AppTextInput({ send, search, icon, width='100%', onPress, ...otherProps }) {
    return (
        <View style={[styles.container, { width }]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>}
            {search && <Ionicons name={search} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>}
            <TextInput style={defaultStyles.textInput} blurOnSubmit {...otherProps} />
            {send && <Ionicons onPress={onPress} name={send} size={20} color={defaultStyles.colors.medium} style={styles.send}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 10,
        flexDirection: "row",
        padding: 5,
        marginLeft: -40
    },
    icon: {
        marginRight: 10
    },
    send: {
        position: 'absolute',
        right: 40,
        top: 5
    },
})