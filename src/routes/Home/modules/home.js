import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import request from '../../../util/request';
import calculateFare from '../../../util/fareCalculator';
import _ from 'lodash';

const { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTION,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    GET_FARE 
} = constants
const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATION*LATITUDE_DELTA;

export function getCurrentLocation() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                })
            },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }
}

export function getInputData(payload) {
    return {
        type: GET_INPUT,
        payload        
    }
}

export function toggleSearchResultModal(payload) {
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload        
    }
}

export function getAddressPrediction() {
    return(dispatch, store) => {
        let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput, {
            country: "ID"
        })
            .then(results => {
                dispatch({
                    type: GET_ADDRESS_PREDICTION,
                    payload: results
                })
            })
            .catch(error => console.log(error.message))
    }
}

export function getSelectedAddress(payload) {
    const dummyNumbers = {
        baseFare:0.4,
        timeRate:0.14,
        distanceRate:0.97,
        surge:1,        
        duration: 33,
        distance: 15
    }    

    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
        .then(results => {
            dispatch({
                type: GET_SELECTED_ADDRESS,
                payload: results
            })
        })
        .then(() => {
            if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff) {
                request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                    origins: store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
                    destinations: store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
                    mode: "driving",
                    key: "AIzaSyBBpcosweLxValhEHMs6C26VBcEDLzIpw4"
                })
                .finish((error, res) => {
                    dispatch({
                        type: GET_DISTANCE_MATRIX,
                        payload: res
                    })
                })
            }
            setTimeout(function() {
                if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff) {
                    // const duration = _.isEmpty(store().home.distanceMatrix.rows[0].elements[0].duration.value) ? 0 : store().home.distanceMatrix.rows[0].elements[0].duration.value
                    // const distance = _.isEmpty(store().home.distanceMatrix.rows[0].elements[0].distance.value) ? 0 : store().home.distanceMatrix.rows[0].elements[0].distance.value
                    const fare = calculateFare(
                        dummyNumbers.baseFare,
                        dummyNumbers.timeRate,
                        store().home.distanceMatrix.rows[0].elements[0].duration.value,       
                        dummyNumbers.distanceRate,
                        store().home.distanceMatrix.rows[0].elements[0].distance.value,
                        dummyNumbers.surge,
                    );
                    dispatch({
                        type: GET_FARE,
                        payload: fare
                    })
                }
            }, 1000)
        })
        .catch(err => console.log(err))
    }
}

function handleGetCurrentLocation(state, action) {
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }         
        }
    })
}

function handleGetInput(state, action) {
    const { key, value } = action.payload
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }        
    })
}

function handleToggleSearchResult(state, action) {
    if(action.payload === "pickUp") {
        return update(state, {
            resultTypes: {
                pickUp: {
                    $set: true,
                },
                dropOff: {
                    $set: false
                }
            },
            predictions: {
                $set: {}
            }
        })
    }
    if(action.payload === "dropOff") {
        return update(state, {
            resultTypes: {
                pickUp: {
                    $set: false,
                },
                dropOff: {
                    $set: true
                }
            },
            predictions: {
                $set: {}
            }
        })
    }
}

function handleGetAddressPredictions(state, action) {
    return update(state, {
        predictions: {
            $set: action.payload
        }
    })
}

function handleGetSelectedAddress(state, action) {
    let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff"
    return update(state, {
        selectedAddress: {
            [selectedTitle]: {
                $set: action.payload
            }            
        },
        resultTypes: {
            pickUp: {
                $set: false
            },
            dropOff: {
                $set: false
            }
        }
    })
}

function handleGetDistanceMatrix(state, action) {
    return update(state, {
        distanceMatrix: {
            $set: action.payload
        }
    })
}

function handleGetFare(state, action) {
    return update(state, {
        fare: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInput,
    TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
    GET_ADDRESS_PREDICTION: handleGetAddressPredictions,
    GET_SELECTED_ADDRESS: handleGetSelectedAddress,
    GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
    GET_FARE: handleGetFare    
};

const initialState = {
    region: {},
    inputData: {},
    resultTypes: {},
    selectedAddress: {}    
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}