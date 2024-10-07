import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TextInput, Button } from 'react-native';
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
        <View style={{ padding: 20 }}>
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
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Ofertas Recebidas</Text>

            <FlatList
                data={ofertas}
                keyExtractor={(item) => item.criancaId.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 10 }}>
                        <Text>Escola: {item.escolaNome}</Text>
                        <Text>Criança: {item.criancaNome}</Text>
                        <Text>Responsável: {item.responsavelNome}</Text>
                        <Text>Mensagem: {item.mensagem}</Text>

                        <View>
                            <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 5 }}
                                placeholder="Digite o valor que deseja enviar"
                                keyboardType="numeric"
                                onChangeText={(text) => setValor({ ...valor, [item.id]: parseFloat(text) })}
                            />
                            <Button title="Responder" onPress={() => {
                                console.log('ID do item:', item.id);
                                responderOferta(parseInt(item.id, 10)); // id para número
                            }} />
                        </View>

                    </View>
                )}
            />
        </View>
    );
}
