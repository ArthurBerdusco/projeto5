import { Alert, Platform, ScrollView, Keyboard  } from 'react-native';
import { View, StyleSheet, Text, Pressable, TextInput, SafeAreaView } from "react-native";
import { useState } from "react";
import config from '@/app/config';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker"
import { format } from 'date-fns'; // se você estiver usando date-fns
import { ptBR } from 'date-fns/locale';
import { Picker } from '@react-native-picker/picker'; // Importando o Picker




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
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [role, setRole] = useState(null);

    const [endereco, setEndereco] = useState<Endereco>({
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        complemento: ''
    })

    const handleEnderecoChange = (field: keyof Endereco, value: string) => {
        // Atualiza o estado do endereço
        setEndereco(prevState => ({
            ...prevState,
            [field]: value
        }));

        // Se o campo alterado for o CEP
        if (field === 'cep') {
            const formattedCep = formatCep(value);
            setEndereco(prevState => ({
                ...prevState,
                cep: formattedCep
            }));

            if (formattedCep.length === 9) { // Verifica se o CEP tem o formato completo
                buscarEnderecoPorCep(formattedCep.replace('-', '')); // Remove o traço antes de buscar
            } else {
                limparCamposEndereco();
            }
        }
    };

    const formatCep = (value: string) => {
        // Remove caracteres não numéricos
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 5) return cleaned; // Retorna se ainda não tiver o suficiente
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`; // Formata no padrão xxxxx-xxx
    };

    const buscarEnderecoPorCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            // Verifica se o retorno é válido
            if (!data.erro) {
                Keyboard.dismiss();

                // Atualiza os campos do endereço com os dados retornados
                setEndereco(prevState => ({
                    ...prevState,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    complemento: data.complemento || '', // Preenche complemento se existir
                    numero: '' // Limpa o número ao buscar
                }));
            } else {
                Alert.alert("Erro", "CEP não encontrado. Verifique e tente novamente.");
                limparCamposEndereco();
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao buscar o endereço. Tente novamente mais tarde.");
            console.error("Erro ao buscar endereço: ", error);
        }
    };

    const limparCamposEndereco = () => {
        setEndereco(prevState => ({
            ...prevState,
            rua: '',
            bairro: '',
            complemento: '',
            numero: '' // Limpa o campo de número se necessário
        }));
    };


    const [date, setDate] = useState(new Date(2000,0,1))
    const [showPicker, setShowPicker] = useState(false);

    const toggleDataPicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDataPicker();
                const formattedDate = format(currentDate, "dd/MM/yyyy", { locale: ptBR });

                setDataNascimento(formattedDate); // Exemplo de uso
            }

        } else {
            toggleDataPicker();
        }
    }



    const handleSubmit = async () => {
        try {

            const formattedDateNascimento = format(date, "dd/MM/yyyy");

            const response = await fetch(`${config.IP_SERVER}/cadastro`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    dataNascimento: formattedDateNascimento,
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

                    <Text style={styles.text}>Data de nascimento</Text>
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}

                        />
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDataPicker}>
                            <TextInput
                                style={styles.textInputs}
                                value={dataNascimento}
                                onChangeText={setDataNascimento}
                                placeholder='Selecione'
                                editable={false}
                            />
                        </Pressable>
                    )}

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
                    <Picker
                        selectedValue={role}
                        onValueChange={(itemValue) => setRole(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione" value={null} />
                        <Picker.Item label="Motorista" value="MOTORISTA" />
                        <Picker.Item label="Responsavel" value="RESPONSAVEL" />
                    </Picker>
                </View>

                <View style={styles.containerInputs}>
            <Text style={styles.textTitle}>Endereço:</Text>
            <View>
                <Text style={styles.text}>CEP</Text>
                <TextInput
                    style={styles.textInputs}
                    value={endereco.cep}
                    onChangeText={(text) => handleEnderecoChange('cep', text)}
                    maxLength={10} // Limite de caracteres para o formato xxxxx-xxx
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
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
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



