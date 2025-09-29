import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  title: string;
  onPress?: () => void;
};

export default function ThemedButton({ title, onPress }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: theme.colors.primary, padding: theme.spacing.md, borderRadius: 8 }]} onPress={onPress}>
      <Text style={[styles.text, { color: theme.colors.surface, fontSize: theme.typography.body }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { alignItems: 'center' },
  text: { fontWeight: '600' },
});


