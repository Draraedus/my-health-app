import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, StyleSheet, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { GREEN_600 } from '@shared/ui/colors'

import { Navigation } from 'src/routeParams'

// Author: Adriel Luiz Santana dos Santos

/**
 * Esse componente retorna o botão de histórico das calculadoras,
 * é um botão fixado na parte inferior direita da tela
 *
 * @usage
 * ```tsx
 * <MenuCalculatorItem calculatorName=''  />
 * ```
 */
export default function MenuHistoryButton() {
  const navigation = useNavigation<Navigation>()

  return (
    <View style={styles.rootContainer}>
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
  rootContainer: {
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
