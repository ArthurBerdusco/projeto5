import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TextInput, Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config'; // Configuração do servidor
import { Stack } from 'expo-router';

export default function MostraOfertas() {
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [valor, setValor] = useState({}); // Armazenar os valores para cada oferta

    // Função para buscar as ofertas
    const fetchOfertas = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');

            if (!idMotorista) {
                throw new Error('ID do motorista não encontrado');
            }

            const response = await fetch(`${config.IP_SERVER}/oferta/motorista/${idMotorista}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setOfertas(data);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar ofertas.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const responderOferta = async (id) => {
        console.log('ID recebido:', id);

        // Verifica se o ID é um número válido
        if (typeof id !== 'number' || isNaN(id)) {
            Alert.alert('Erro', 'ID da oferta inválido.');
            return;
        }

        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');

            const response = await fetch(`${config.IP_SERVER}/oferta/responder/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valor[id]),
            });

            const message = await response.text();
            Alert.alert('Sucesso', message);
            console.log(message);
            fetchOfertas();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao responder a oferta.');
            console.log(error);
        }
    };


    useEffect(() => {
        fetchOfertas();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (

        <SafeAreaView>

            <Stack.Screen
                options={{
                    headerTitle: 'Ofertas',
                    headerStyle: { backgroundColor: '#ffbf00' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />


            <FlatList
                style={styles.flatList}
                data={ofertas}
                keyExtractor={(item) => item.criancaId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.containerInputs}>

                        <View style={{ marginVertical: 10 }}>
                            <Text>Nome da criança: {item.criancaNome}</Text>
                            <Text>Escola: {item.escolaNome}</Text>
                            <Text>Responsável: {item.responsavelNome}</Text>
                            <Text>Endereço: {item.endereco}</Text>
                            <Text>Mensagem: {item.mensagem}</Text>
                            <Text>Status: {item.status}</Text>

                            <View>
                                {/* Verificação corrigida */}
                                {(item.status !== "Aceita" && item.status !== "Valor enviado" && item.status !== "Recusado") && (
                                    <>
                                        <TextInput
                                            style={styles.textInputs}
                                            placeholder="Digite o valor que deseja enviar"
                                            keyboardType="numeric"
                                            onChangeText={(text) => setValor({ ...valor, [item.id]: parseFloat(text) })}
                                        />
                                        <Button title="Responder" onPress={() => {
                                            console.log('ID do item:', item.id);
                                            responderOferta(parseInt(item.id, 10)); // id convertido para número
                                        }} />
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    flatList: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    containerInputs: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    },
    textInputs: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
});
