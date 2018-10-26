import React from 'react';
import { Text, Image } from 'react-native';
import { View, List, ListItem, Body } from 'native-base';

import styles from './SearchResultsStyles';

const mapIcon = require('../../../../assets/map.png')

const SearchResults = ({predictions}) => {
    return(
        <View style={styles.searchResultsWrapper}>    
            <List
                dataArray={predictions}
                renderRow={(item) => (
                    <View>
                        <ListItem>                    
                            <Image
                                source={mapIcon} style={{ height: 20, width: 20 }}
                            />     
                            <Body>
                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                            </Body>                                           
                        </ListItem>
                    </View>   
                )}
            />                                       
        </View>
    )
}

export default SearchResults;