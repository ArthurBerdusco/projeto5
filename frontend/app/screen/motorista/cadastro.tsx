import { Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView, Switch } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import { useState } from "react";
import { useRouter } from 'expo-router';

export default function CadastroResponsavel() {

    const router = useRouter();  // Adicione isso para usar o roteamento

    const [placa, setPlaca] = useState('');
    const [quantidadeAcentos, setQuantidadeAcentos] = useState('');
    const [renavam, setRenavam] = useState('');
    const [anoVeiculo, setAnoVeiculo] = useState('');
    const [cnh, setCnh] = useState('');
    const [antecedentes, setAntecedentes] = useState('');

    const [isEnabledAC, setIsEnabledAC] = useState(false);
    const [isEnabledCortina, setIsEnabledCortina] = useState(false);
    const [isEnabledTV, setIsEnabledTV] = useState(false);
    const [isEnabledCameras, setIsEnabledCameras] = useState(false);
    const [isEnabledAcessibilidade, setIsEnabledAcessibilidade] = useState(false);

    const toggleSwitchAC = () => setIsEnabledAC(previousState => !previousState);
    const toggleSwitchCortina = () => setIsEnabledCortina(previousState => !previousState);
    const toggleSwitchTV = () => setIsEnabledTV(previousState => !previousState);
    const toggleSwitchCameras = () => setIsEnabledCameras(previousState => !previousState);
    const toggleSwitchAcessibilidade = () => setIsEnabledAcessibilidade(previousState => !previousState);


    const navegarDash = async () => {
        alert("navegando")
        router.push('/screen/motorista');
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://192.168.15.21:8080/cadastro", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    idade: idade,
                    cpf: cpf,
                    telefone: telefone,
                    role: role,
                }),
            });

            Alert.alert(await response.text())

            if (response.ok) {
                Alert.alert("Success", "Cadastro feito com sucesso!");
            } else {
                Alert.alert("Error", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };

    return (
        <SafeAreaView style={styles.total}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={{ fontWeight: '800', textAlign: 'center', fontSize: 20 }}>Cadastrar Perua escolar</Text>
                <View style={styles.containerInputs}>
                    <TextInput
                        placeholder="Placa do veículo"
                        style={styles.textInputs}
                        value={placa}
                        onChangeText={setPlaca}
                    />
                    <TextInput
                        placeholder="Quantidades de acentos"
                        style={styles.textInputs}
                        value={quantidadeAcentos}
                        onChangeText={setQuantidadeAcentos}
                    />
                    <TextInput
                        placeholder="RENAVAM"
                        style={styles.textInputs}
                        value={renavam}
                        onChangeText={setRenavam}
                    />


                    <TextInput
                        placeholder="CNH"
                        style={styles.textInputs}
                        value={cnh}
                        onChangeText={setCnh}
                    />


                    <TextInput
                        placeholder="Número de registro de antecedentes criminais"
                        style={styles.textInputs}
                        value={antecedentes}
                        onChangeText={setAntecedentes}
                    />


                    <TextInput
                        placeholder="Ano do veículo"
                        style={styles.textInputs}
                        value={anoVeiculo}
                        onChangeText={setAnoVeiculo}
                    />





                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Switch
                                trackColor={{ false: '#000000', true: '#0d99ff' }}
                                thumbColor={isEnabledAC ? '#ffbf00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchAC}
                                value={isEnabledAC}
                            />
                            <Text>Ar Condicionado</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Switch
                                trackColor={{ false: '#000000', true: '#0d99ff' }}
                                thumbColor={isEnabledCortina ? '#ffbf00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchCortina}
                                value={isEnabledCortina}
                            />
                            <Text>Cortina</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Switch
                                trackColor={{ false: '#000000', true: '#0d99ff' }}
                                thumbColor={isEnabledTV ? '#ffbf00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchTV}
                                value={isEnabledTV}
                            />
                            <Text>TV</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Switch
                                trackColor={{ false: '#000000', true: '#0d99ff' }}
                                thumbColor={isEnabledCameras ? '#ffbf00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchCameras}
                                value={isEnabledCameras}
                            />
                            <Text>Cameras Internas</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Switch
                                trackColor={{ false: '#000000', true: '#0d99ff' }}
                                thumbColor={isEnabledAcessibilidade ? '#ffbf00' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchAcessibilidade}
                                value={isEnabledAcessibilidade}
                            />
                            <Text>Acessibilidade</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonSubmit} onPress={navegarDash}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between'

    },
    containerInputs: {
        flex: 1,
        justifyContent: 'center',
        gap: 20
    },
    textInputs: {
        backgroundColor: "transparent",
        width: "100%",
        height: 50,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center"
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#2B2B2B',
        borderWidth: 2,
        borderRadius: 20,
    },
    dropdown: {
        width: '100%',
        borderColor: '#2B2B2B',
        borderWidth: 2,
        borderRadius: 20,
    },
    buttonSubmit: {
        backgroundColor: "#ffbf00",
        width: "100%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "black",
        fontWeight: "700",
    },
    containerButton: {
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 20,
    }
});