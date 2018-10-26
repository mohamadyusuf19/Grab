import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const styles = {
    searchResultsWrapper: {
        top: 220,
        position: 'absolute',
        width: width,
        height: 1000,
        backgroundColor: '#fff',
        opacity: 0.9
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737'
    },
    secondaryText: {
        fontStyle: 'italic',
        color: '#7d7d7d'
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7d7d7d'
    },
    leftIcon: {
        fontSize: 20,
        color: '#7d7d7d'
    },
    distance: {
        fontSize: 12
    }

}
export default styles;