import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

export default function Index() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.15.21:8080/motorista", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          idade: parseInt(idade),
        }),
      });
      
      if (response.ok) {
        Alert.alert("Success", "Motorista salvo com sucesso!");
      } else {
        Alert.alert("Error", "Não foi possível salvar o motorista.");
      }
    } catch (error) {
      Alert.alert("Error", "Erro de conexão com o backend.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          width: "100%",
          paddingLeft: 10,
        }}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          width: "100%",
          paddingLeft: 10,
        }}
        placeholder="Idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />
      <Button title="Salvar Motorista" onPress={handleSubmit} />
      <Link href={"/screen/motorista"}>
        <Text>About</Text>
      </Link>

      <Link href={"/screen/auth/loginScreen"}>
        <Text>Tela de Login</Text>
      </Link>
    </View>
  );
}
