import FotoPerfil from '@/app/components/Foto/FotoPerfil';
import FotosVan from '@/app/components/Foto/FotosVan';
import config from '@/app/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';

interface Imagem {
    id: number;
    nome: string;
    dados: string | null;
}

interface Van {
    placa: string;
    renavam: string;
    anoFabricacao: string;
    modelo: string;
    fabricante: string;
    cor: string;
    quantidadeAssentos: string;
    acessibilidade: boolean;
    arCondicionado: boolean;
    cortinas: boolean;
    tvEntretenimento: boolean;
    camerasSeguranca: boolean;
    cintoSeguranca: boolean;
    extintorIncendio: boolean;
    cnh: string;
    antecedentesCriminais: boolean;
    imagem: Imagem;
}


export default function VehicleInfoScreen() {

    const [loading, setLoading] = useState(false)
    const [idMotorista, setIdMotorista] = useState("");

    const [van, setVan] = useState<Van>({
        placa: '',
        renavam: '',
        anoFabricacao: '',
        modelo: '',
        fabricante: '',
        cor: '',
        quantidadeAssentos: '',
        acessibilidade: false,
        arCondicionado: false,
        cortinas: false,
        tvEntretenimento: false,
        camerasSeguranca: false,
        cintoSeguranca: false,
        extintorIncendio: false,
        cnh: '',
        antecedentesCriminais: false,
        imagem: {
            id: 0,
            nome: '',
            dados: null
        }
    });

    const fetchVan = async () => {
        setLoading(true);
        try {
            const motorista = (await AsyncStorage.getItem('idMotorista')) ?? "";

            setIdMotorista(motorista);

            const resultado = await fetch(`${config.IP_SERVER}/motorista/van/${motorista}`);
            const dados = await resultado.json();
            setVan(dados);

        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVan();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0d99ff" />
            </View>
        );
    }

    const handleChange = (field: keyof Van, value: string | boolean) => {
        setVan((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAlterar = async () => {
        try {
            const idMotorista = await AsyncStorage.getItem('idMotorista')
            const response = await fetch(`${config.IP_SERVER}/motorista/van/atualizar/${idMotorista}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(van),
            });

            if (response.ok) {
                alert('Dados alterados com sucesso!');
            } else {
                alert('Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao enviar os dados.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'Veiculo Escolar',
                    headerStyle: { backgroundColor: '#ffbf00' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            />
            <ScrollView>
                {/* Identificação do Veículo */}
                <View style={styles.janela}>
                    <Text style={styles.textTitle}>Identificação do Veículo</Text>
                    <TextInput
                        placeholder="Fabricante"
                        style={styles.textInputs}
                        value={van.fabricante}
                        onChangeText={(text) => handleChange('fabricante', text)}
                    />
                    <TextInput
                        placeholder="Modelo"
                        style={styles.textInputs}
                        value={van.modelo}
                        onChangeText={(text) => handleChange('modelo', text)}
                    />
                    <TextInput
                        placeholder="Ano de Fabricação"
                        style={styles.textInputs}
                        value={van.anoFabricacao}
                        onChangeText={(text) => handleChange('anoFabricacao', text)}
                    />

                    <TextInput
                        placeholder="Cor"
                        style={styles.textInputs}
                        value={van.cor}
                        onChangeText={(text) => handleChange('cor', text)}
                    />
                    <TextInput
                        placeholder="Placa"
                        style={styles.textInputs}
                        value={van.placa}
                        onChangeText={(text) => handleChange('placa', text)}
                    />
                    <TextInput
                        placeholder="Renavam"
                        style={styles.textInputs}
                        value={van.renavam}
                        onChangeText={(text) => handleChange('renavam', text)}
                    />
                </View>

                <View style={styles.janela}>
                    <Text style={styles.textTitle}>Capacidade e Conforto</Text>
                    <TextInput
                        placeholder="Quantidade de Assentos"
                        style={styles.textInputs}
                        value={van.quantidadeAssentos}
                        onChangeText={(text) => handleChange('quantidadeAssentos', text)}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Acessibilidade</Text>
                        <Switch
                            value={van.acessibilidade}
                            onValueChange={(value) => handleChange('acessibilidade', value)}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Ar Condicionado</Text>
                        <Switch
                            value={van.arCondicionado}
                            onValueChange={(value) => handleChange('arCondicionado', value)}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Cortinas</Text>
                        <Switch
                            value={van.cortinas}
                            onValueChange={(value) => handleChange('cortinas', value)}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>TV Entretenimento</Text>
                        <Switch
                            value={van.tvEntretenimento}
                            onValueChange={(value) => handleChange('tvEntretenimento', value)}
                        />
                    </View>
                </View>

                {/* Segurança */}
                <View style={styles.janela}>
                    <Text style={styles.textTitle}>Segurança</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Câmeras de Segurança</Text>
                        <Switch
                            value={van.camerasSeguranca}
                            onValueChange={(value) => handleChange('camerasSeguranca', value)}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Cinto de Segurança</Text>
                        <Switch
                            value={van.cintoSeguranca}
                            onValueChange={(value) => handleChange('cintoSeguranca', value)}
                        />
                    </View>

                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Extintor de Incêndio</Text>
                        <Switch
                            value={van.extintorIncendio}
                            onValueChange={(value) => handleChange('extintorIncendio', value)}
                        />
                    </View>

                </View>

                {/* Documentação do Motorista */}
                <View style={styles.janela}>
                    <Text style={styles.textTitle}>Documentação do Motorista</Text>
                    <TextInput
                        placeholder="CNH"
                        style={styles.textInputs}
                        value={van.cnh}
                        onChangeText={(text) => handleChange('cnh', text)}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.text}>Antecedentes Criminais</Text>
                        <Switch
                            value={van.antecedentesCriminais}
                            onValueChange={(value) => handleChange('antecedentesCriminais', value)}
                        />
                    </View>
                </View>

                <FotoPerfil
                    idEntidade={idMotorista}
                    entidade={"Van"}
                    initialImage={van.imagem?.dados ? `data:image/jpeg;base64,${van.imagem.dados}` : null}
                />


                <Pressable style={styles.button} onPress={handleAlterar}>
                    <Text style={styles.textButton}>Salvar</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
    },
    janela: {
        flex: 0.3,
        backgroundColor: 'beige',
        borderWidth: 5,
        padding: 10
    },
    textTitle: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginTop: 10,
        marginBottom: 5,
    },
    textInputs: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10
    },
    text: {
        marginTop: 10,
        marginBottom: 5,
    },
    button: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#ffbf00',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});
