import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { bookedCabs, unBookCab } from '../../firebaseConfig';
import CabListView from '../views/cabListView';
import { useIsFocused } from '@react-navigation/native';

export function MyCapScreen() {
    const [cabs, setCabs] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            bookedCabs()
            .then((data) => {
                setCabs(data);
            })
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <CabListView cabs={cabs} callBack= {(item) => {
                Alert.alert(
                    "Alert",
                    "Do you want to cancel the booking?",
                    [
                        { text: "Yes", onPress: () => {
                            unBookCab(item.id);
                            bookedCabs()
                            .then((data) => {
                                setCabs(data);
                            })
                        } },
                        { text: "No", onPress: () => console.log("Cancel Pressed") }
                    ]
                );
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
});