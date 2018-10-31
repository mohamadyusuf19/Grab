import { connect } from 'react-redux';
import Home from '../components/Home';
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction,
    getSelectedAddress
} from '../modules/home';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || {},
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare
});

const mapActionsCreator = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction,
    getSelectedAddress
};
export default connect(mapStateToProps, mapActionsCreator)(Home);