import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({ route }: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const id = route.params?.id;

  useEffect(() => {
    setLoading(true);
    // Simula chamada assíncrona
    setTimeout(() => {
      setData({ id, title: `Item ${id}`, description: 'Descrição do item' });
      setLoading(false);
    }, 900);
  }, [id]);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{data.title}</Text>
      <Text style={{ color: theme.colors.muted }}>{data.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 8 },
});


