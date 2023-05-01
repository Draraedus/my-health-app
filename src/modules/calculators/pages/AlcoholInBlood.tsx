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
import AlcoholCalculator from '../models/calculators/AlcoholCalculator'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  AllCalculators.AlcoholInBlood
>

export default function AlcoholInBlood(props: CalculatorsProps) {
  const alcohol = new AlcoholCalculator()

  const [weight, setWeight] = useState(0)
  const [volume, setVolume] = useState(0)
  const [percentual, setPercentual] = useState(0)
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

  function calculateAlcoholInBlood() {
    alcohol.setWeight(weight)
    alcohol.setPercentual(percentual)
    alcohol.setVolume(volume)
    alcohol.calculate()
    setResultDescription(alcohol.printResultDescription())
    setResult(alcohol.result)
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.primaryContainer}
    >
      <TittleContainer name={AllCalculators.AlcoholInBlood} />
      <DescriptionContainer description={alcohol.description} />
      <View style={[styles.alcoholCalculateContainer, globalStyles.marginTop4]}>
        <CalculatorFormField label="Peso: (kg)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(parseFloat(text))}
            placeholder="Ex.: 50"
          />
        </CalculatorFormField>
        <CalculatorFormField label="Volume Ingerido: (ml)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setVolume(parseFloat(text))}
            placeholder="Ex.: 1000"
          />
        </CalculatorFormField>
        <CalculatorFormField label="Percentual do Teor Álcoolico: (%)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setPercentual(parseFloat(text))}
            placeholder="Ex.: 5"
          />
        </CalculatorFormField>
        <TextButton
          style={[styles.buttonCalculate, globalStyles.marginTop3]}
          onPress={calculateAlcoholInBlood}
        >
          Calcular
        </TextButton>
      </View>
      {result !== 0 && (
        <ResultCalculateContainer
          result={result.toFixed(1).toString()}
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
  alcoholCalculateContainer: {
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
