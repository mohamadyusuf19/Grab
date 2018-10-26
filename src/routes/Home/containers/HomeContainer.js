import { connect } from 'react-redux';
import Home from '../components/Home';
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction
} from '../modules/home';

const mapStateToProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || {}
});

const mapActionsCreator = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    getAddressPrediction
};
export default connect(mapStateToProps, mapActionsCreator)(Home);