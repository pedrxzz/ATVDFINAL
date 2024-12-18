import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; // Tela de lista de produtos
import ProductFormScreen from './src/screens/ProductFormScreen'; // Tela de formulário

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Produtos' }} />
                <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: 'Gerenciar Produto' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
