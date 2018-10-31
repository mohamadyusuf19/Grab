import React from 'react';
import { Text, Image } from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import styles from './SearchBoxStyles';

const searchBoxIcon = require('../../../../assets/search.png')

const SearchBox = ({ getInputData, toggleSearchResultModal, getAddressPrediction, selectedAddress }) => {
    const { selectedPickUp, selectedDropOff } = selectedAddress || {};
    function handleInput(key, val) {
        getInputData({
            key,
            value:val
        });
        getAddressPrediction();
    }    

    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK UP</Text>                
                <InputGroup>
                    <Image source={searchBoxIcon} style={{ height: 20, width: 20 }}/>
                    <Input 
                        style={styles.inputSearch} 
                        onFocus={() => toggleSearchResultModal('pickUp')}
                        placeholder="Choose pick-up location" 
                        onChangeText={handleInput.bind(this, 'pickUp')}
                        value={selectedPickUp && selectedPickUp.name}
                    />
                </InputGroup>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>DROP OFF</Text>                
                <InputGroup>
                    <Image source={searchBoxIcon} style={{ height: 20, width: 20 }}/>
                    <Input 
                        style={styles.inputSearch} 
                        onFocus={() => toggleSearchResultModal('dropOff')}
                        placeholder="Choose drop-off location" 
                        onChangeText={handleInput.bind(this, 'dropOff')}
                        value={selectedDropOff && selectedDropOff.name}
                    />
                </InputGroup>
            </View>
        </View>
    )
}

export default SearchBox;