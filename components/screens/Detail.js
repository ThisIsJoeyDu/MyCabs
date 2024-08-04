import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { bookCab, bookedCabs, unBookCab } from '../../firebaseConfig';

export default function DetailScreen({ route, navigation }) {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.CompanyName}</Text>
            <Text style={styles.subTitle}>{item.CarModel}</Text>
            <Text style={styles.text}>Passengers: {item.NumberOfPassenger}</Text>
            <Text style={styles.text}>Rating: {item.Rating}</Text>
            <Text style={styles.text}>Cost/Hour: ${item.CostPerhour}</Text>
            <View style={styles.buttonContainer}>
                <Button title= {item.booked ? "Unbook" : "Book Now"} onPress={ () => {
                    if (item.booked) {
                        unBookCab(item.id)
                        .then(() => {
                            navigation.navigate('Home');
                        });
                    } else {
                        bookedCabs().then((data) => {
                            if (data.length >= 2) {
                                alert('Booking Limit Exceeded', 'You cannot book more than 2 cabs at a time.');
                                return;
                            }
                            bookCab(item.id);
                            navigation.navigate('Home');
                        });
                    }
                }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f8f8',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
    },
    subTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      color: '#666',
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
      color: '#444',
    },
    buttonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
  });
