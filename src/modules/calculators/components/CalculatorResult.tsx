import { View, StyleSheet } from 'react-native'

import { StyledText, TextBox, TextButton } from '@shared/ui/components'

import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { globalStyles } from '@shared/ui/globalStyles'

/**
 * Esse componente retorna um container já com o resultado,
 * a descrição do resultado e um botão para salvá-lo,
 * sendo necessário passar pelas props a variável de resultado
 * desejada e a descrição desejada em tipo string.
 *
 * @usage
 * ```tsx
 * <CalculatorResult result="" resultDescription="" />
 * ```
 */
export default function CalculatorResult(props: any) {
  return (
    <View
      style={[
        styles.primaryContainer,
        globalStyles.marginTop3,
        globalStyles.marginBottom3,
      ]}
    >
      <View style={styles.resultContainer}>
        <StyledText style={styles.fontWhite}>Resultado:</StyledText>
        <TextBox
          editable={false}
          keyboardType="numeric"
          value={props.result}
          style={styles.textBoxStyle}
        />
        <TextButton style={styles.buttonSave}>Salvar</TextButton>
      </View>
      <View
        style={[styles.resultDescriptionContainer, globalStyles.marginTop2]}
      >
        <StyledText style={styles.fontWhite}>
          {props.resultDescription}
        </StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  primaryContainer: {
    width: '80%',
    padding: 32,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    backgroundColor: GREEN_600,
  },
  resultContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 6,
    alignItems: 'center',
  },
  resultDescriptionContainer: {},
  fontWhite: {
    color: '#ffffff',
    fontSize: 16,
  },
  textBoxStyle: {
    width: '30%',
    height: 32,
    backgroundColor: '#ffffff',
  },
  buttonSave: {
    borderWidth: 2,
    borderColor: GRAY_300,
    borderRadius: 4,
    height: 36,
    padding: 2,
    outlineStyle: 'none',
    backgroundColor: '#ffffff',
  },
})
