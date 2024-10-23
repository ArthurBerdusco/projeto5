import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

export default function Escola() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [escola, setEscola] = useState(null);
    const [loading, setLoading] = useState(true);
    const [atende, setAtende] = useState(false);

    // Função para verificar se o motorista já atende a escola
    const verificarAtendimento = async (idMotorista) => {
        const response = await fetch(`${config.IP_SERVER}/api/escolas/motorista/atende/${idMotorista}/${id}`);
        const data = await response.json();
        setAtende(data); // Atualiza o status de atendimento (true/false)
    };

    // Função para buscar os dados da escola pelo ID
    const fetchEscola = async () => {
        const response = await fetch(`${config.IP_SERVER}/api/escolas/${id}`);
        const data = await response.json();
        setEscola(data); // Atualiza os dados da escola
    };

    // Função para carregar dados da escola e atendimento em paralelo
    const loadData = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');
            await Promise.all([fetchEscola(), verificarAtendimento(idMotorista)]);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false); // Finaliza o loading após carregar os dados
        }
    };

    useEffect(() => {
        loadData(); // Carregar dados na inicialização
    }, []);

    // Função para confirmar ou cancelar atendimento
    const confirmarAtendimento = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista');
            const response = await fetch(`${config.IP_SERVER}/api/escolas/motorista`, {
                method: atende ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idMotorista,
                    idEscola: id,
                }),
            });

            const result = await response.text();

            if (response.ok) {
                setAtende((prev) => !prev); // Alterna o estado de atendimento
                router.push('/screen/motorista/(tabs)/escolasAtendidas'); // Navega para a tela de escolas atendidas
            } else {
                Alert.alert('Erro', result); // Mostra mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
            Alert.alert('Erro de conexão.');
        }
    };

    // Exibe o indicador de loading enquanto os dados estão sendo carregados
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>

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
