import { View, StyleSheet } from 'react-native'

import { StyledText, TextBox, TextButton } from '@shared/ui/components'

import { GRAY_300, GRAY_900, GREEN_600 } from '@shared/ui/colors'
import { globalStyles } from '@shared/ui/globalStyles'
import saveCalculations from '../services/saveCalculators'
import getCalculations from '../services/getCalculators'
import { CalculatorsData } from '../interface/CalculatorsData'
import { useToastActions } from '@shared/ui/components/toast/ToastProvider'

// Author: Adriel Luiz Santana dos Santos

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

type CalculatorResultProps = {
  calculatorName: string
  result: string
  data: string
  resultDescription: string
}

export default function CalculatorResult(props: CalculatorResultProps) {
  const toast = useToastActions()

  const saveButtonHandler = async (
    calcullatorName: string,
    data: string,
    result: number
  ) => {
    try {
      const calculation: CalculatorsData = { result, data }
      const calculators = await getCalculations(calcullatorName)
      calculators.push(calculation)
      await saveCalculations(calcullatorName, calculators)
      toast.success('Resultado salvo com sucesso!')
    } catch (e) {
      toast.error('Não foi possível salvar o resultado')
    }
  }

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
          value={props.result.toString()}
          style={styles.textBoxStyle}
        />
        <TextButton
          style={styles.saveButton}
          onPress={() =>
            saveButtonHandler(
              props.calculatorName,
              props.data,
              parseFloat(props.result)
            )
          }
        >
          Salvar
        </TextButton>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    columnGap: 6,
  },
  resultDescriptionContainer: {},
  fontWhite: {
    color: '#ffffff',
    fontSize: 16,
  },
  textBoxStyle: {
    width: '30%',
    height: 32,

    textAlign: 'center',
    color: GRAY_900,
    backgroundColor: '#ffffff',
  },
  saveButton: {
    height: 36,
    padding: 4,

    borderRadius: 4,

    borderWidth: 2,
    borderColor: GRAY_300,

    backgroundColor: '#ffffff',
  },
})
