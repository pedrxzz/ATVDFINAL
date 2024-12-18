import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, Alert } from 'react-native';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/produtos');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar os produtos.');
        }
    };

    const handleDeleteProduct = () => {
        fetchProducts(); // Atualiza a lista após excluir um produto
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onEdit={() => navigation.navigate('ProductForm', { product: item })}
                        onDelete={handleDeleteProduct} // Passa a função para atualizar a lista
                    />
                )}
            />
            <Button title="Adicionar Produto" onPress={() => navigation.navigate('ProductForm')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
