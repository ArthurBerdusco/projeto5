import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Link, Stack, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';

export default function ListaEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { crianca } = useLocalSearchParams();
    const parsedCrianca = JSON.parse(crianca);
    console.log("ID da Criança na Lista de Escolas:", parsedCrianca.id); // Agora você pode acessar o ID



    const fetchEscolas = async () => {
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

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            setLoading(false);
        };
        carregarDados();
    }, []);

    const renderItem = ({ item }) => {

        return (
            <View style={styles.escolaAtendida}>
                <Link
                    href={{
                        pathname: `/screen/responsavel/crianca/escola/[id]`,
                        params: {
                            id: item.id,
                            crianca, // Agora passando o objeto crianca correto
                        },
                    }}
                    style={styles.buttonEscola}>
                </Link>
                <Text style={styles.textNome}>{item.nome}</Text>
                <Text style={styles.textRua}>{item.rua}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#0d99ff' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
            <Text style={styles.title}>Selecione a escola</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={escolas}
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    link: {
        flex: 1,
    },
    schoolName: {
        fontSize: 18,
    },
    escolaAtendida: {
        marginTop: 10,
        borderColor: 'black'
    },
    buttonEscola: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#2b2b2b',
        height: 120,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textNome: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000000',

    },

    textRua: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#6D6D6D',

    },
});
