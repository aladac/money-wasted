import React, { useState, useRef } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [moneyWastedSoFar, setMoney] = useState(0)
  const [isWasting, setIsWasting] = useState(false)
  const [isNotWasting, setIsNotWasting] = useState(false)
  const increment = useRef(null)
  const [buttonLabel, setLabel] = useState('Start')

  const usdPerHour = 25

  let startWasting = () => {
    setIsWasting(true)
    setIsNotWasting(true)
    increment.current = setInterval(() => {
      setMoney((moneyWastedSoFar) => moneyWastedSoFar + usdPerHour / 60)
    }, 1000)
  }

  let pauseWasting = () => {
    clearInterval(increment.current)
    setIsNotWasting(false)
  }

  let formatCurrency = () => {
    return `$ ${moneyWastedSoFar.toFixed(2)}`
  }

  let toggleWasting = () => {
    if (!isWasting && !isNotWasting) {
      startWasting()
      setLabel('Pause')
    } else if (isNotWasting) {
      pauseWasting()
      setLabel('Resume')
    } else {
      setLabel('Pause')
      startWasting()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        As a develper, earning {usdPerHour} bucks per hour
        I waste this much of my employers money on meetings
      </Text>
      <Text style={styles.currency}>
        {formatCurrency()}
      </Text>
      <TouchableOpacity
        onPress={() => toggleWasting()}
        style={styles.button}>
        <Text style={styles.buttonLabel}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  currency: {
    fontSize: '48px',
    margin: '24px'
  },
  buttonLabel: {
    fontSize: '24px'
  },
  button: {
    width: '200px',
    border: '1px solid black',
    textAlign: 'center',
    borderRadius: '5px',
    padding: '5px',
    marginTop: '12px'
  },
  text: {
    fontSize: '24px',
    textAlign: 'center'
  },
  container: {
    padding: '50px',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
