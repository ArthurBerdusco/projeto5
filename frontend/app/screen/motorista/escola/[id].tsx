import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

export default function Escola() {
    const [escola, setEscola] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atende, setAtende] = useState(false);
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Função para verificar se o motorista já atende a escola
    const verificarAtendimento = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');
            const response = await fetch(`${config.IP_SERVER}/api/escolas/motorista/atende/${idMotorista}/${id}`);
            const data = await response.json();
            setAtende(data); // Corrigido para data diretamente, que deve ser true ou false
        } catch (error) {
            console.error('Erro ao verificar atendimento:', error);
        }
    };

    // Função para buscar os dados da escola pelo ID
    const fetchEscola = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/api/escolas/${id}`);
            const data = await response.json();
            setEscola(data);
        } catch (error) {
            console.error('Erro ao buscar os detalhes da escola:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            await fetchEscola(); // Buscar dados da escola
            await verificarAtendimento(); // Verificar se já atende a escola
            setLoading(false);
        };
        carregarDados();
    }, []);

    const confirmarAtendimento = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');
            const idEscola = id;

            const response = await fetch(`${config.IP_SERVER}/api/escolas/motorista`, {
                method: atende ? 'DELETE' : 'POST', // POST para atender, DELETE para parar de atender
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idMotorista: idMotorista,
                    idEscola: idEscola,
                }),
            });

            const result = await response.text();

            if (response.ok) {
                setAtende(prev => !prev); // Inverte o status de atendimento
                router.push('/screen/motorista/escola/escolasAtendidas');
            } else {
                Alert.alert('Erro', result); // Exibe a mensagem de erro do backend
            }
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
            Alert.alert('Erro de conexão.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Escola',
                    headerStyle: { backgroundColor: '#ffbf00' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
            {escola ? (
                <>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{escola.nome}</Text>
                    <Text>Endereço: {escola.rua}</Text>

                    <Button
                        title={atende ? "Parar de atender" : "Atender esta escola"}
                        onPress={confirmarAtendimento}
                        color={atende ? "red" : "green"} // A cor muda dinamicamente com base no estado 'atende'
                    />
                </>
            ) : (
                <Text>Escola não encontrada</Text>
            )}
        </View>
    );
}
