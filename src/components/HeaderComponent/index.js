import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderComponent = ({ textHeader }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{textHeader}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FF5E3A',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 18
    }
})

export default HeaderComponent;