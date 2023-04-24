import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { GREEN_600 } from '@shared/ui/colors'

import { Navigation } from 'src/routeParams'

export default function HistoryButton() {
  const navigation = useNavigation<Navigation>()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalculatorsHistory')}
      >
        <FontAwesome name="history" style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: GREEN_600,
    padding: 24,
    borderRadius: 50,
  },
  icon: {
    fontSize: 32,
    color: '#ffffff',
  },
})
