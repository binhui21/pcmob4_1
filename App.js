import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [nextArrival, setNextArrival] = useState("");
  const [duration, setDuration] = useState("");
  const [nextDuration, setNextDuration] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const [busNumber, setBusNumber] = useState("155")
  const time = new Date(arrival);
  const nextTime = new Date(nextArrival);

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === busNumber
        )[0];
        
        setArrival(myBus.next.time);
        setNextArrival(myBus.subsequent.time);
        setDuration(myBus.next.duration_ms)
        setNextDuration(myBus.subsequent.duration_ms)
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : `${time.toLocaleTimeString()} (${duration/1000} sec)`}
      </Text>
      <Text style={styles.nextArrivalTime}>
        {loading ? <ActivityIndicator size="small" /> : `${nextTime.toLocaleTimeString()} (${nextDuration/1000} sec)`}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress = {loadBusStopData}>Refresh!</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  nextArrivalTime: {
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    margin: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
  },
  buttonText: {

  },
});
