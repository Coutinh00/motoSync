import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import api from '../services/api';
import storage from '../services/storage';

// Home screen: carrega lista de motos da API com cache local

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      // tenta cache
      const cached = await storage.getItem('bikes');
      if (cached && mounted) setBikes(cached);
      try {
        const data = await api.get('bikes');
        if (mounted) {
          setBikes(data);
          await storage.setItem('bikes', data);
        }
      } catch (e) {
        // deixa o cache se falhar
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading && bikes.length === 0) return <View style={styles.center}><ActivityIndicator /></View>;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.typography.h2 }]}>Motos</Text>
      <FlatList data={bikes} keyExtractor={(i) => i.id?.toString() || ''} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.name || item.model || `#${item.id}`}</Text>
          <Button title="Ver" onPress={() => navigation.navigate('Details', { id: item.id })} />
        </View>
      )} />
      <View style={{ height: 12 }} />
      <Button title="Configurações" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 16 },
  item: { padding: 12, backgroundColor: '#fff', marginBottom: 8, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 16 },
});


