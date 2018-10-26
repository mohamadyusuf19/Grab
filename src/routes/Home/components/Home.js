import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import MapContainer from './MapContainer';

class Home extends Component {
    componentDidMount() {
        this.props.getCurrentLocation()
    }

    render() {
        return (
            <Container>
                {this.props.region.latitude &&
                    <MapContainer
                        region={this.props.region}
                        getInputData={this.props.getInputData}
                        toggleSearchResultModal={this.props.toggleSearchResultModal}
                        getAddressPrediction={this.props.getAddressPrediction}
                        resultTypes={this.props.resultTypes}
                        predictions={this.props.predictions}
                    />
                }
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