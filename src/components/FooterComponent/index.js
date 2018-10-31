import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';

const car = require('../../assets/car.png')

const FooterComponent = () => {

    const tabs = [
        {
            "title": "Taxi Car",
            "subTitle": "",
            "icon": car
        },
        {
            "title": "Taxi Share",
            "subTitle": "",
            "icon": car
        },
        {
            "title": "Taxi Premium",
            "subTitle": "",
            "icon": car
        },
        {
            "title": "Taxi Bike",
            "subTitle": "",
            "icon": car
        }
    ]

    return (    
        <Footer>
            <FooterTab style={styles.footerContainer}>
                {
                    tabs.map((item, index) => {
                        return (
                            <Button key={index}>
                                <Image
                                    source={item.icon}
                                    style={{ height: 20, width: 20, tintColor: (index === 0) ? "#FF5E3A" : "#77716b" }}
                                />
                                <Text style={{ fontSize:12, color: (index === 0) ? "#FF5E3A" : "#77716b" }}>{item.title}</Text>
                                <Text style={styles.subText}>{item.subTitle}</Text>
                            </Button>
                        )
                    })
                }            
            </FooterTab>
        </Footer>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#fff'
    },
    subText: {
        fontSize: 8
    },
    logo: {
        width: 50,
        height: 50
    }
});

export default FooterComponent;