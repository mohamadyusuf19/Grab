import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import HomeContainer from './Home/containers/HomeContainer';

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="home" component={HomeContainer} title="Home" initial />
    </Scene>
)

export default scenes;