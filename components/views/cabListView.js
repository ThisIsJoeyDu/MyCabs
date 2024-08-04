import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CabListView = ({cabs, callBack}) => {    
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={ () => {
                callBack(item);
            }}>
                <View style={styles.itemContainer}>
                    <Text>{item.CompanyName}</Text>
                    <Text>{item.CarModel}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={cabs}
                renderItem={ renderItem }
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    itemContainer: {
        flex: 1,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
});

export default CabListView;