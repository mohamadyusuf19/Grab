import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import styles from './MapContainerStyles';
import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

const MapContainer = ({ region, getInputData, toggleSearchResultModal, getAddressPrediction, resultTypes, predictions }) => {
    return (
        <View style={styles.container}>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
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
            />
            {(resultTypes.pickUp || resultTypes.dropOff) &&
                <SearchResults predictions={predictions}/>
            }            
        </View>
    )
}

export default MapContainer;