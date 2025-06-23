import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../ThemeContext';

export default function SettingsScreen() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const backgroundColor = resolvedTheme === 'dark' ? '#000' : '#fff';
  const textColor = resolvedTheme === 'dark' ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>
      <Text style={{ color: textColor, marginBottom: 5 }}>
        Theme color: 
      </Text>

      <Picker
        selectedValue={theme}
        onValueChange={(itemValue) => setTheme(itemValue)}
        style={[styles.picker, { color: textColor, backgroundColor }]}
        dropdownIconColor={textColor}
      >
        <Picker.Item label="Dark" value="dark" />
        <Picker.Item label="Light" value="light" />
        <Picker.Item label="System" value="system" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  picker: {
    height: 50,
    borderRadius: 10,
    padding: 10
  },
});
