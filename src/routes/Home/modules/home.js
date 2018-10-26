import update from 'react-addons-update';
import constants from './actionConstants';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

const { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTION 
} = constants
const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATION*LATITUDE_DELTA;

export function getCurrentLocation() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
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

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInput,
    TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
    GET_ADDRESS_PREDICTION: handleGetAddressPredictions    
};

const initialState = {
    region: {},
    inputData: {},
    resultTypes: {}    
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}