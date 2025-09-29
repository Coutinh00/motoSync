import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import authService from '../services/authService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.includes('@')) return 'Email inválido';
    if (password.length < 6) return 'Senha deve ter ao menos 6 caracteres';
    return null;
  };

  const onSubmit = async () => {
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    const res = await authService.signin({ email, password });
    setLoading(false);
    if (res.ok) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } else {
      setError(res.message || 'Erro');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.typography.h2 }]}>Entrar</Text>
      <ThemedInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <ThemedInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={[styles.error, { color: theme.colors.danger }]}>{error}</Text> : null}
      {loading ? <ActivityIndicator /> : <ThemedButton title="Entrar" onPress={onSubmit} />}
      <View style={styles.row}>
        <Text style={{ color: theme.colors.muted }}>Não tem conta? </Text>
        <Text style={[styles.link, { color: theme.colors.primary }]} onPress={() => navigation.navigate('Signup')}>Criar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 4 },
  title: { fontSize: 24, marginBottom: 12, textAlign: 'center' },
  error: { color: 'red', marginBottom: 8 },
  row: { flexDirection: 'row', marginTop: 12, justifyContent: 'center' },
  link: { color: 'blue' },
});


