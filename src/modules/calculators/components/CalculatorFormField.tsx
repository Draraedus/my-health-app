import { View, Text, ViewProps, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react'
import { StyledText } from '@shared/ui/components'

/**
 * Um campo qualquer de um formulário. Exibe a label do campo,
 * enquanto que o input deve ser passado como componente filho.
 * Criado expecialmente para os formulários das calculadoras.
 *
 * @usage
 * ```tsx
 * <CalculatorFormField label="Nome">
 *   <TextBox></TextBox>
 * </CalculatorFormField>
 * ```
 */
export function CalculatorFormField(
  props: PropsWithChildren<{ label: string }> & ViewProps
) {
  return (
    <View {...props}>
      <StyledText style={styles.label}>{props.label}</StyledText>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
})
