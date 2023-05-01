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
import AlcoholCalculator from '../models/calculators/AlcoholCalculator'
import { calculatorStyles } from '../utils/calculatorStyles'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  AllCalculators.AlcoholInBlood
>

export default function AlcoholInBlood(props: CalculatorsProps) {
  const alcohol = new AlcoholCalculator()

  const [weight, setWeight] = useState(NaN)
  const [volume, setVolume] = useState(NaN)
  const [percentual, setPercentual] = useState(NaN)
  const [result, setResult] = useState(NaN)
  const [resultDescription, setResultDescription] = useState('')
  const [errorWeightMessage, setErrorWeightMessage] = useState(false)
  const [errorVolumeMessage, setErrorVolumeMessage] = useState(false)
  const [errorPercentualMessage, setErrorPercentualMessage] = useState(false)

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
    if (Boolean(weight) && !isNaN(volume) && !isNaN(percentual)) {
      setErrorWeightMessage(false)
      setErrorVolumeMessage(false)
      setErrorPercentualMessage(false)
      alcohol.setWeight(weight)
      alcohol.setPercentual(percentual)
      alcohol.setVolume(volume)
      alcohol.calculate()
      setResultDescription(alcohol.printResultDescription())
      setResult(alcohol.result)
    } else {
      Boolean(weight)
        ? setErrorWeightMessage(false)
        : setErrorWeightMessage(true)
      !isNaN(volume)
        ? setErrorVolumeMessage(false)
        : setErrorVolumeMessage(true)
      !isNaN(percentual)
        ? setErrorPercentualMessage(false)
        : setErrorPercentualMessage(true)
    }
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.rootContainer}
    >
      <TittleContainer name={AllCalculators.AlcoholInBlood} />
      <DescriptionContainer description={alcohol.description} />
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
        <CalculatorFormField
          label="Volume Ingerido:"
          style={calculatorStyles.width50}
        >
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setVolume(parseFloat(text))}
              placeholder="Ex.: 1000"
            />
            <StyledText style={calculatorStyles.whiteText}>ml</StyledText>
          </View>
          {errorVolumeMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Volume inválido. Exemplo válido: 1000
            </StyledText>
          )}
        </CalculatorFormField>
        <CalculatorFormField
          label="Percentual do Teor Álcoolico:"
          style={calculatorStyles.width50}
        >
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setPercentual(parseFloat(text))}
              placeholder="Ex.: 5.4"
            />
            <StyledText style={calculatorStyles.whiteText}>%</StyledText>
          </View>
          {errorPercentualMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Altura inválida. Exemplo válido: 5.4
            </StyledText>
          )}
        </CalculatorFormField>
        <TextButton
          style={[calculatorStyles.calculateButton, globalStyles.marginTop3]}
          onPress={calculateAlcoholInBlood}
        >
          Calcular
        </TextButton>
      </View>
      {!isNaN(result) && (
        <ResultCalculateContainer
          result={result.toFixed(1).toString()}
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
