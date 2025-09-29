import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import authService from '../services/authService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function Signup({ navigation }: Props) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.includes('@')) return 'Email inválido';
    if (password.length < 6) return 'Senha deve ter ao menos 6 caracteres';
    if (password !== confirm) return 'Senhas não conferem';
    return null;
  };

  const onSubmit = async () => {
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    const res = await authService.signup({ email, password });
    setLoading(false);
    if (res.ok) navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    else setError(res.message || 'Erro');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.typography.h2 }]}>Criar conta</Text>
      <ThemedInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <ThemedInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <ThemedInput placeholder="Confirmar senha" value={confirm} onChangeText={setConfirm} secureTextEntry />
      {error ? <Text style={[styles.error, { color: theme.colors.danger }]}>{error}</Text> : null}
      {loading ? <ActivityIndicator /> : <ThemedButton title="Criar" onPress={onSubmit} />}
      <View style={styles.row}>
        <Text style={{ color: theme.colors.muted }}>Já tem conta? </Text>
        <Text style={[styles.link, { color: theme.colors.primary }]} onPress={() => navigation.navigate('Login')}>Entrar</Text>
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


