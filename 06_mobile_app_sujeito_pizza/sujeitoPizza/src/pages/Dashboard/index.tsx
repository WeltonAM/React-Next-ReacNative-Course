import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Dashboard() {
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
                />

                <TouchableOpacity style={styles.btn}>
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
