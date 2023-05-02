import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'

import { GRAY_900, GREEN_200, GREEN_500 } from '@shared/ui/colors'
import { StyledText } from '@shared/ui/components'
import { FontAwesome5 } from '@expo/vector-icons'

import { Navigation } from 'src/routeParams'
import { AllCalculators } from '../calculatorsEnum'

// Author: Adriel Luiz Santana dos Santos

/**
 * Esse componente retorna um botão customizado utilizado
 * no menu de calculadoras, o uso dele é na iteração de .map
 * para renderizar botões selecionavéis das calculadoras existentes.
 *
 * @usage
 * ```tsx
 * <MenuCalculatorItem calculatorName=''  />
 * ```
 */
export function MenuCalculatorItem(props: { calculatorName: AllCalculators }) {
  const navigation = useNavigation<Navigation>()

  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const handlePress = () => {
    setBackgroundColor(GREEN_200)
  }

  const handleRelease = () => {
    setBackgroundColor('#ffffff')
  }

  return (
    <TouchableOpacity
      style={[styles.rootContainer, { backgroundColor }]}
      onPress={() => navigation.navigate(props.calculatorName)}
      onPressIn={handlePress}
      onPressOut={handleRelease}
      activeOpacity={0.6}
    >
      <FontAwesome5 name="calculator" style={styles.icon} />
      <StyledText>{props.calculatorName}</StyledText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    height: 108,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',

    shadowColor: GRAY_900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  icon: {
    padding: 16,

    fontSize: 32,
    color: GREEN_500,
  },
})
