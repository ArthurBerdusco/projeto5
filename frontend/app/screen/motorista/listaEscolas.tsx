import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [escolasAtendidas, setEscolasAtendidas] = useState(new Set()); 
    const [loading, setLoading] = useState(true);

    const fetchEscolas = async () => {
        try {
            const escolasResponse = await fetch('http://192.168.15.161:8080/api/escolas');
            const escolasData = await escolasResponse.json();
            setEscolas(escolasData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados.');
        }
    };

    const fetchAtendidas = async () => {
        try {
            const idUsuario = await AsyncStorage.getItem('idUsuario');
            const atendidasResponse = await fetch('http://192.168.15.161:8080/api/escolas/atendidas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idUsuario }),
            });
            const atendidasData = await atendidasResponse.json();

            // Cria um Set com os IDs das escolas atendidas
            const atendidasSet = new Set(atendidasData.map(item => item.idEscola));
            setEscolasAtendidas(atendidasSet);

        } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar escolas atendidas.');
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEscolas();
        fetchAtendidas();
        setLoading(false);
    }, []);

    const renderItem = ({ item }) => {
        // Verifica se a escola está no Set de escolas atendidas
        const isAtendida = escolasAtendidas.has(item.id);

        return (
            <View style={styles.itemContainer}>
                <Link
                    href={{
                        pathname: `/screen/motorista/escola/[id]`,
                        params: { id: item.id },
                    }}
                    style={styles.link}
                >
                    <Text style={styles.schoolName}>{item.nome}</Text>
                </Link>
                <View style={[styles.statusIndicator, { backgroundColor: isAtendida ? 'blue' : 'gray' }]} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Escolas</Text>
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
    statusIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
});
