import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";

export default function Index() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = async () => {
    alert('ENTREI AQUI')
    try {
      const response = await fetch("http://localhost:8080/motorista", {
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
    </View>
  );
}
