import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function ProductCard({ product, onEdit, onDelete }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`/produtos/${product._id}`);
            Alert.alert('Sucesso', 'Produto excluído com sucesso!');
            onDelete(); // Atualiza a lista após excluir
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível excluir o produto.');
        }
    };

    return (
        <View style={styles.card}>
            {product.foto && <Image source={{ uri: product.foto }} style={styles.image} />}
            <Text style={styles.title}>{product.nome}</Text>
            <Text>{product.descricao}</Text>
            <Text>Quantidade: {product.quantidade}</Text>
            <Button title="Editar" onPress={onEdit} />
            <Button title="Deletar" onPress={handleDelete} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
