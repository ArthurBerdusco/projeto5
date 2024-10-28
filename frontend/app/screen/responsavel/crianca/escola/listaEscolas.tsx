import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert, TextInput } from 'react-native';
import { Link, Stack, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

export default function ListaEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loading, setLoading] = useState(false);
    const { idResponsavel, idCrianca, idMotorista } = useLocalSearchParams();

    const [searchQuery, setSearchQuery] = useState('');

    const fetchEscolas = async () => {
        alert("ID CRIANÇA: " + idCrianca)
        setLoading(true);
        try {
            
            const escolasResponse = await fetch(`${config.IP_SERVER}/api/escolas`);
            const escolasData = await escolasResponse.json();
            setEscolas(escolasData);
         
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEscolas();
    }, []);

    const filteredEscolas = escolas.filter(escola => {
        const nomeMatch = escola.nome.toLowerCase().includes(searchQuery.toLowerCase());
        const ruaMatch = escola.rua.toLowerCase().includes(searchQuery.toLowerCase());
        return nomeMatch || ruaMatch;
    });

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    const renderItem = ({ item }: any) => {
        // Verifica se os dados da imagem estão disponíveis

        return (

            <Link
                href={{
                    pathname: `/screen/responsavel/crianca/escola/[id]`,
                    params: {
                        idCrianca: idCrianca,
                        idMotorista: idMotorista,
                        idEscola: item.id,
                        idResponsavel: idResponsavel,
                    }
                }}
                style={styles.buttonEscola}
            >
                <View style={styles.textContainer}> {/* View para organizar os textos */}
                    <Text style={styles.textNome}>{item.nome}</Text>
                    <Text style={styles.textRua}>{item.rua}</Text>
                </View>
            </Link>

        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nome ou endereço"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Text style={styles.title}>Selecione a escola</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredEscolas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text>Nenhuma escola encontrada</Text>}
                />
            )}
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    searchInput: {
        backgroundColor: "#ffffff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
        elevation: 2, // Adiciona sombra leve para destaque
    },
    escolaAtendida: {
        flexDirection: 'column',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        height: 100, // Altura ajustada
        backgroundColor: '#e0e0e0',
    },
    textContainer: {
        flexDirection: 'column',
        padding: 10, // Espaçamento interno para melhor legibilidade
    },
    buttonEscola: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#007bff', // Cor do fundo do botão
        marginBottom: 10, // Espaço entre os itens
    },
    textNome: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#ffffff',
    },
    textRua: {
        fontSize: 14,
        lineHeight: 20,
        color: '#ffffff',
        marginTop: 4,
    },
    emptyListText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

