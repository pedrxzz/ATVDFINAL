import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Image } from 'react-native';
import axios from '../services/api';
import * as ImagePicker from 'expo-image-picker';

export default function ProductFormScreen({ route, navigation }) {
    const product = route.params?.product || {};
    const [nome, setNome] = useState(product.nome || '');
    const [descricao, setDescricao] = useState(product.descricao || '');
    const [quantidade, setQuantidade] = useState(product.quantidade || '');
    const [foto, setFoto] = useState(product.foto || '');

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri); // Define a URI da imagem selecionada
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('quantidade', quantidade);
        if (foto) {
            formData.append('foto', {
                uri: foto,
                type: 'image/jpeg',
                name: 'produto.jpg',
            });
        }

        try {
            if (product._id) {
                await axios.put(`/produtos/${product._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post('/produtos', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            Alert.alert('Sucesso', 'Produto salvo com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível salvar o produto.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
            />
            <Button title="Selecionar Imagem" onPress={handlePickImage} />
            {foto ? <Image source={{ uri: foto }} style={{ width: 100, height: 100 }} /> : null}
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
    },
});
