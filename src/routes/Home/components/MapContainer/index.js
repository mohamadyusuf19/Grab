import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapContainerStyles';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

const MapContainer = ({ region, getInputData, toggleSearchResultModal, getAddressPrediction, resultTypes, predictions, getSelectedAddress, selectedAddress }) => {
    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsCompass={true}
            >
                <MapView.Marker
                    coordinate={region}
                    pinColor="green"
                />                
            </MapView>
            <SearchBox 
                getInputData={getInputData}
                toggleSearchResultModal={toggleSearchResultModal}    
                getAddressPrediction={getAddressPrediction}
                selectedAddress={selectedAddress}
            />
            {(resultTypes.pickUp || resultTypes.dropOff) &&
                <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
            }            
        </View>
    )
}

export default MapContainer;