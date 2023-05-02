import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { StyledText } from '@shared/ui/components'
import { StyleSheet, View } from 'react-native'

// Author: Adriel Luiz Santana dos Santos

/**
 * Esse componente retorna um container com o título
 * da calculadora, necessário passar apenas a string
 * do título.
 *
 * @usage
 * ```tsx
 * <CalculatorTittle name=''  />
 * ```
 */
export default function CalculatorTittle(props: any) {
  return (
    <View style={[styles.rootContainer]}>
      <StyledText style={styles.textTittle}>{props.name}</StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: GREEN_600,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    color: '#ffffff',
    textAlign: 'center',
  },
  textTittle: {
    color: '#ffffff',
    fontSize: 16,
  },
})
