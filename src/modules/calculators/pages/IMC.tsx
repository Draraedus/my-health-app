import { useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { globalStyles } from '@shared/ui/globalStyles'
import { TextBox, TextButton } from '@shared/ui/components'

import { AllCalculators } from '../calculatorsEnum'
import { RouteParams } from '../../../routeParams'
import TittleContainer from '../components/TittleContainer'
import DescriptionContainer from '../components/DescriptionContainer'
import IMCCalculator from '../models/calculators/IMCCalculator'
import { GRAY_300, GRAY_900, GREEN_600 } from '@shared/ui/colors'
import { FormFieldCalculator } from '../components/FormFieldCalculator'
import ResultCalculateContainer from '../components/ResultCalculateContainer'

type CalculatorsProps = NativeStackScreenProps<RouteParams, AllCalculators.IMC>

export default function IMC(props: CalculatorsProps) {
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [result, setResult] = useState(0)
  const [resultDescription, setResultDescription] = useState('')

  const imc = new IMCCalculator()

  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY === 0) {
      scrollViewRef.current?.scrollTo({ y: -100, animated: true })
    }
  }

  function calculateImc() {
    imc.weight = weight
    imc.height = height
    imc.calculate()
    setResultDescription(imc.printResultDescription())
    setResult(imc.result)
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.primaryContainer}
    >
      <TittleContainer name={AllCalculators.IMC} />
      <DescriptionContainer description={imc.description} />
      <View style={[styles.imcCalculateContainer, globalStyles.marginTop4]}>
        <FormFieldCalculator label="Peso: (KG)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseFloat(text))}
            placeholder="Ex.: 50"
          />
        </FormFieldCalculator>
        <FormFieldCalculator label="Altura: (M)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setHeight(parseFloat(text))}
            placeholder="Ex.: 1.75"
          />
        </FormFieldCalculator>
        <TextButton
          style={[styles.buttonCalculate, globalStyles.marginTop3]}
          onPress={calculateImc}
        >
          Calcular
        </TextButton>
      </View>
      {result !== 0 && (
        <ResultCalculateContainer
          result={result.toFixed(2).toString()}
          resultDescription={resultDescription}
        />
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  primaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imcCalculateContainer: {
    width: '80%',
    padding: 32,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    backgroundColor: GREEN_600,
  },
  textBoxStyle: {
    width: '40%',
    backgroundColor: '#ffffff',
  },
  buttonCalculate: {
    borderWidth: 2,
    borderColor: GRAY_300,
    borderRadius: 4,
    width: '40%',
    padding: 8,
    outlineStyle: 'none',
    backgroundColor: '#ffffff',
  },
  textWhite: {
    color: '#ffffff',
  },
})
