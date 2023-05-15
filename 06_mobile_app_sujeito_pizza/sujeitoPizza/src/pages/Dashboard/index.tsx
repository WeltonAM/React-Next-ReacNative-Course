import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, serNumber] = useState('');

    async function openOrder() {
        if (number === '') return;

        navigation.navigate('Order', { number: number, order_id: '' });
    }

    return (
        <TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()
        }>

            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Novo Pedido</Text>

                <TextInput
                    placeholder='Número da mesa'
                    placeholderTextColor='#f0f0f0'
                    style={styles.input}
                    keyboardType='numeric'
                    value={number}
                    onChangeText={serNumber}
                />

                <TouchableOpacity style={styles.btn} onPress={openOrder}>
                    <Text style={styles.btnText}>Abrir mesa</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },

    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },

    btn: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})
