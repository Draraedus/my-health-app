import { useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteParams } from '../../../routeParams'

import { globalStyles } from '@shared/ui/globalStyles'
import { GRAY_300, GREEN_600 } from '@shared/ui/colors'

import { TextBox, TextButton } from '@shared/ui/components'
import TittleContainer from '../components/CalculatorTittle'
import DescriptionContainer from '../components/CalculatorDescription'
import { CalculatorFormField } from '../components/CalculatorFormField'
import ResultCalculateContainer from '../components/CalculatorResult'

import { AllCalculators } from '../calculatorsEnum'
import TotalBodyWaterCalculator from '../models/calculators/TotalBodyWaterCalculator'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  AllCalculators.TotalBodyWater
>

export default function TotalBodyWater(props: CalculatorsProps) {
  const bodyWater = new TotalBodyWaterCalculator()

  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [result, setResult] = useState(0)
  const [resultDescription, setResultDescription] = useState('')

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
    bodyWater.setWeight(weight)
    bodyWater.setHeight(height)
    bodyWater.calculate()
    setResultDescription(bodyWater.printResultDescription())
    setResult(bodyWater.result)
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.primaryContainer}
    >
      <TittleContainer name={AllCalculators.TotalBodyWater} />
      <DescriptionContainer description={bodyWater.description} />
      <View style={[styles.totalBodyWaterContainer, globalStyles.marginTop4]}>
        <CalculatorFormField label="Altura:">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setHeight(parseFloat(text))}
            placeholder="Ex.: 1.75"
          />
        </CalculatorFormField>

        <View style={[styles.secondContainer, globalStyles.marginTop4]}>
          <CalculatorFormField label="Sexo:">
            <TextBox
              style={styles.textBoxStyle}
              keyboardType="numeric"
              onChangeText={(text) => setHeight(parseFloat(text))}
              placeholder="Ex.: 1.75"
            />
          </CalculatorFormField>
        </View>

        <CalculatorFormField label="Idade:">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseFloat(text))}
            placeholder="Ex.: 50"
          />
        </CalculatorFormField>

        <CalculatorFormField label="Peso: (KG)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseFloat(text))}
            placeholder="Ex.: 50"
          />
        </CalculatorFormField>

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
  secondContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
  },
  totalBodyWaterContainer: {
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
