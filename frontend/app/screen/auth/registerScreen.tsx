import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import config from '@/app/config';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
}

export default function CadastroScreen() {

    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [idade, setIdade] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Motorista', value: 'MOTORISTA' },
        { label: 'Responsavel', value: 'RESPONSAVEL' }
    ]);

    const [endereco, setEndereco] = useState<Endereco>({
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        complemento: ''
    })

    const handleEnderecoChange = (field: keyof typeof endereco, value: string) => {
        setEndereco(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${config.IP_SERVER}/cadastro`, {
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
                    endereco: endereco
                }),
            });

            // Checa se a resposta foi bem-sucedida
            if (response.ok) {
                const resultado = await response.json(); // Lê o corpo da resposta como JSON

                if (role === "MOTORISTA") {
                    await AsyncStorage.setItem('motorista', JSON.stringify(resultado));
                    await AsyncStorage.setItem('idMotorista', resultado.id.toString());
                    router.push('/screen/motorista/cadastro');
                } else if (role === "RESPONSAVEL") {
                    await AsyncStorage.setItem('responsavel', JSON.stringify(resultado));
                    await AsyncStorage.setItem('idResponsavel', resultado.id.toString());
                    router.push('/screen/responsavel');
                }
            } else {
                const errorMessage = await response.text(); // Lê o corpo como texto em caso de erro
                alert("ERRO: " + errorMessage);
            }
        } catch (error) {
            alert("Erro: " + error.message);
        }
    };


    return (
        <SafeAreaView style={styles.total}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cadastro de Usuário</Text>
                </View>

                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Dados pessoais:</Text>

                    <Text style={styles.text}>Nome Completo</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.text}>Senha</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <Text style={styles.text}>Idade</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={idade}
                        onChangeText={setIdade}
                    />

                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={cpf}
                        onChangeText={setCpf}
                    />

                    <Text style={styles.text}>Telefone</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={telefone}
                        onChangeText={setTelefone}
                    />

                    {/* DropDownPicker para tipo de usuário */}
                    <Text style={styles.text}>Tipo de usuário</Text>
                    <View style={styles.dropdownWrapper}>
                        <DropDownPicker
                            open={open}
                            value={role}
                            items={items}
                            setOpen={setOpen}
                            setValue={setRole}
                            setItems={setItems}
                            placeholder="Selecione"
                            style={styles.picker}
                            dropDownContainerStyle={styles.dropdown}
                        />
                    </View>
                </View>

                <View style={styles.containerInputs}>
                    <Text style={styles.textTitle}>Endereço:</Text>
                    <View>
                        <Text style={styles.text}>CEP</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={endereco.cep}
                            onChangeText={(text) => handleEnderecoChange('cep', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Rua</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={endereco.rua}
                            onChangeText={(text) => handleEnderecoChange('rua', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Número</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={endereco.numero}
                            onChangeText={(text) => handleEnderecoChange('numero', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Bairro</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={endereco.bairro}
                            onChangeText={(text) => handleEnderecoChange('bairro', text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Complemento</Text>
                        <TextInput
                            style={styles.textInputs}
                            value={endereco.complemento}
                            onChangeText={(text) => handleEnderecoChange('complemento', text)}
                        />
                    </View>
                </View>

                <View style={styles.containerButton}>
                    <Pressable style={styles.buttonSubmit} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </Pressable>
                </View>
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
});



