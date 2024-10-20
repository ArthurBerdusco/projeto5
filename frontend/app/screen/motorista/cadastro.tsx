import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView, Switch } from "react-native";

import { useState } from "react";
import { useRouter } from 'expo-router';
import config from '@/app/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    fotosVeiculo: string[]; // Array para armazenar URLs ou paths das fotos do veículo
}

export default function CadastroResponsavel() {

    const router = useRouter();

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
        fotosVeiculo: [] // Array para armazenar URLs ou paths das fotos do veículo
    });

    const handleChange = (field: keyof Van, value: string | boolean) => {
        setVan((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {

            const idMotorista = await AsyncStorage.getItem('idMotorista');



            if (!idMotorista) {
                Alert.alert("Error", "ID do motorista não encontrado.");
                return;
            }

            console.log("Iniciando envio de dados...");

            console.log("Dados a serem enviados:", van);

            const response = await fetch(`${config.IP_SERVER}/motorista/cadastro-van/${idMotorista}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(van),
            });

            console.log("Resposta do servidor:", response);

            const responseBody = await response.text();
            console.log("Corpo da resposta:", responseBody);

            if (response.ok) {
                router.push('/screen/motorista');
            } else {
                alert(responseBody)
                Alert.alert("Error", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            alert("error")
            console.error("Erro de conexão com o backend:", error);
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };



    return (
        <SafeAreaView style={styles.total}>
            <ScrollView>
                <Text style={{ fontWeight: '800', textAlign: 'center', fontSize: 20 }}>Cadastrar Perua escolar</Text>
                <View style={styles.containerInputs}>
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

                    <Text style={styles.text}>Ano do veículo</Text>
                    <TextInput
                        placeholder="Exemplo '2012'"
                        maxLength={4}
                        style={styles.textInputs}
                        value={van.anoFabricacao}
                        keyboardType='numeric'
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

                {/* {Capacidade e Conforto} */}
                <View style={styles.containerInputs}>
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
                <View style={styles.containerInputs}>
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
                <View style={styles.containerInputs}>
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

                <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
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
    dropdownWrapper: {
        marginBottom: 15,
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 8,
        position: 'static'
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    },
    containerButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    buttonSubmit: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});