import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? "Loading..." : "Loaded"}
      </Text>
      <Button title="Refresh!" style={styles.button}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  arrivalTime: {
    alignItems: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  button: {
    backgroundColor: 'green',
    margin: 10,
  },
});
