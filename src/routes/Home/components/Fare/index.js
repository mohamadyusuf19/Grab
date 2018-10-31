import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width

const Fare = ({ fare }) => {
    return (
        <View style={styles.fareContainer}>
            <Text style={styles.amount}>Harga: {fare}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fareContainer: {
        width: width,
        height: 40,
        padding: 10,
        backgroundColor: '#f1f1f1'
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 12
    }
})

export default Fare