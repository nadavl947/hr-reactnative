import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompanyScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>CompanyScreen</Text>
        </View>
    )
}

CompanyScreen.navigationOptions = () => {
    return {
        headerTitle: "CompanyScreen"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CompanyScreen;