import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated, Alert } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: NavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true); // to toggle password visibility
  const [scaleValue] = useState(new Animated.Value(1)); // for button animation
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
//   const navigation = useNavigation();

 // Function to validate the form inputs
 const validateInputs = () => {
    // Validate username
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Username is required');
      return false;
    }

    // Validate password
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password is required');
      return false;
    }

    // Additional validation: Password length check
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long');
      return false;
    }

    // If everything is fine, return true
    return true;
  };

 // Handle login functionality
 const handleLogin = () => {
    if (validateInputs()) {
      // If inputs are valid, dispatch the login request
      console.log('Logging in...');
      dispatch(loginRequest({ username, password }));
    }
  };

  // Navigate to HomeScreen and reset stack on successful login
  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isLoggedIn]);

  const togglePasswordVisibility = () => {
    setSecurePassword(!securePassword);
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.background}>
            <View style={styles.formContainer}>
              <Title style={styles.title}>Welcome Back</Title>

              <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                mode="outlined"
                autoCapitalize="none"
                theme={{ colors: { primary: '#fff' } }}
              />

              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                mode="outlined"
                secureTextEntry={securePassword}
                theme={{ colors: { primary: '#fff' } }}
              />

              <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  style={styles.loginButton}
                  labelStyle={styles.loginButtonText}
                  contentStyle={styles.loginButtonContent}
                  onPressIn={animateButton}
                >
                  Log In
                </Button>
              </Animated.View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Text style={[styles.footerText, styles.signUpText]}>Sign Up</Text>
              </View>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
    borderRadius: 30,
    elevation: 10, // Shadow effect
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  loginButton: {
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: '#4c669f', // Button color matching the gradient
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonContent: {
    paddingVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#333',
  },
  signUpText: {
    color: '#4c669f',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
