import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export default function ThemedInput(props: Props) {
  const theme = useTheme();
  return <TextInput placeholderTextColor={theme.colors.muted} style={[styles.input, { borderColor: theme.colors.muted, padding: theme.spacing.sm, borderRadius: 8, fontSize: theme.typography.body }]} {...props} />;
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, marginBottom: 12, backgroundColor: 'white' },
});


