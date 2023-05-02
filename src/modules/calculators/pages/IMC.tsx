import { useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteParams } from '../../../routeParams'

import { globalStyles } from '@shared/ui/globalStyles'

import { StyledText, TextBox, TextButton } from '@shared/ui/components'
import TittleContainer from '../components/CalculatorTittle'
import DescriptionContainer from '../components/CalculatorDescription'
import { CalculatorFormField } from '../components/CalculatorFormField'
import ResultCalculateContainer from '../components/CalculatorResult'

import { AllCalculators } from '../calculatorsEnum'
import IMCCalculator from '../models/calculators/IMCCalculator'
import { calculatorStyles } from '../utils/calculatorStyles'

// Author: Adriel Luiz Santana dos Santos

type CalculatorsProps = NativeStackScreenProps<RouteParams, AllCalculators.IMC>

export default function IMC(props: CalculatorsProps) {
  const imc = new IMCCalculator()

  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [result, setResult] = useState(0)
  const [resultDescription, setResultDescription] = useState('')
  const [errorHeightMessage, setErrorHeightMessage] = useState(false)
  const [errorWeightMessage, setErrorWeightMessage] = useState(false)

  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY === 0) {
      scrollViewRef.current?.scrollTo({ y: -100, animated: true })
    }
  }

  function imcCalculateHandler() {
    if ((isNaN(weight) || weight === 0) && (isNaN(height) || height === 0)) {
      setErrorWeightMessage(true)
      setErrorHeightMessage(true)
    } else if (isNaN(weight) || weight === 0) {
      setErrorHeightMessage(false)
      setErrorWeightMessage(true)
    } else if (isNaN(height) || height === 0) {
      setErrorWeightMessage(false)
      setErrorHeightMessage(true)
    } else {
      setErrorWeightMessage(false)
      setErrorHeightMessage(false)
      imc.setWeight(weight)
      imc.setHeight(height)
      imc.calculate()
      setResultDescription(imc.printResultDescription())
      setResult(imc.result)
    }
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.rootContainer}
    >
      <TittleContainer name={AllCalculators.IMC} />
      <DescriptionContainer description={imc.description} />
      <View
        style={[calculatorStyles.calculateContainer, globalStyles.marginTop4]}
      >
        <CalculatorFormField label="Peso:" style={calculatorStyles.width50}>
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setWeight(parseFloat(text))}
              placeholder="Ex.: 50"
            />
            <StyledText style={calculatorStyles.whiteText}>Kg</StyledText>
          </View>
          {errorWeightMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Peso inválido. Exemplo válido: 50
            </StyledText>
          )}
        </CalculatorFormField>
        <CalculatorFormField label="Altura:" style={calculatorStyles.width50}>
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setHeight(parseFloat(text))}
              placeholder="Ex.: 1.75"
            />
            <StyledText style={calculatorStyles.whiteText}>M</StyledText>
          </View>
          {errorHeightMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Altura inválida. Exemplo válido: 1.75
            </StyledText>
          )}
        </CalculatorFormField>
        <TextButton
          style={[calculatorStyles.calculateButton, globalStyles.marginTop3]}
          onPress={imcCalculateHandler}
        >
          Calcular
        </TextButton>
      </View>
      {result !== 0 && (
        <ResultCalculateContainer
          calculatorName={AllCalculators.IMC}
          data={new Date().toLocaleDateString('pt-BR')}
          result={result.toFixed(2).toString()}
          resultDescription={resultDescription}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
