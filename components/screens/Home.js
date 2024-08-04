import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import CabListView from '../views/cabListView';
import { db, load } from '../../firebaseConfig'
import { useIsFocused } from '@react-navigation/native';


export default function HomeScreen({navigation}) {
    const [cabs, setCabs] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            load()
            .then((data) => {
                setCabs(data);
            })
            console.log('HomeScreen is focused');
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <CabListView cabs={cabs} callBack= {(item) => {
                navigation.navigate('Detail', {item: item});
            }}>
            </CabListView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
