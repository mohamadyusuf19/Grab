import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import MapContainer from './MapContainer';
import Fare from './Fare';
import HeaderComponent from '../../../components/HeaderComponent';
import FooterComponent from '../../../components/FooterComponent';

class Home extends Component {
    componentDidMount() {
        this.props.getCurrentLocation()
    }

    render() {
        return (
            <Container>
                <HeaderComponent
                    textHeader="Home"
                />
                {this.props.region.latitude &&
                    <MapContainer
                        region={this.props.region}
                        getInputData={this.props.getInputData}
                        toggleSearchResultModal={this.props.toggleSearchResultModal}
                        getAddressPrediction={this.props.getAddressPrediction}
                        resultTypes={this.props.resultTypes}
                        predictions={this.props.predictions}
                        getSelectedAddress={this.props.getSelectedAddress}
                        selectedAddress={this.props.selectedAddress}
                    />
                }
                {
                    this.props.fare && 
                    <Fare fare={this.props.fare} />
                }                
                <FooterComponent/>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

export default Home;