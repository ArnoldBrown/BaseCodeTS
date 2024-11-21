import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppDispatch } from '../redux/hooks'; 
import { logout } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    dispatch(logout());

    // Reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // 'Login' must match the key in RootStackParamList
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
