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
import TotalBodyWaterCalculator from '../models/calculators/TotalBodyWaterCalculator'
import { calculatorStyles } from '../utils/calculatorStyles'
import { Picker } from '@react-native-picker/picker'

// Author: Gabriel Marques Costa

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  AllCalculators.TotalBodyWater
>

export default function TotalBodyWater(props: CalculatorsProps) {
  const bodyWater = new TotalBodyWaterCalculator()

  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [age, setAge] = useState(0)
  const [sex, setSex] = useState('Masculino' || 'Feminino')
  const [result, setResult] = useState(0)
  const [resultDescription, setResultDescription] = useState('')
  const [errorHeightMessage, setErrorHeightMessage] = useState(false)
  const [errorWeightMessage, setErrorWeightMessage] = useState(false)
  const [errorAgeMessage, setErrorAgeMessage] = useState(false)

  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY === 0) {
      scrollViewRef.current?.scrollTo({ y: -100, animated: true })
    }
  }

  function bodyWaterCalculateHandler() {
    if (Boolean(weight) && Boolean(height) && Boolean(age)) {
      setErrorWeightMessage(false)
      setErrorHeightMessage(false)
      setErrorAgeMessage(false)
      bodyWater.setWeight(weight)
      bodyWater.setHeight(height)
      bodyWater.setAge(age)
      bodyWater.setSex(sex)
      bodyWater.calculate()
      setResultDescription(bodyWater.printResultDescription())
      setResult(bodyWater.result)
    } else {
      Boolean(weight)
        ? setErrorWeightMessage(false)
        : setErrorWeightMessage(true)
      Boolean(height)
        ? setErrorHeightMessage(false)
        : setErrorHeightMessage(true)
      Boolean(age) ? setErrorAgeMessage(false) : setErrorAgeMessage(true)
    }
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.rootContainer}
    >
      <TittleContainer name={AllCalculators.TotalBodyWater} />
      <DescriptionContainer description={bodyWater.description} />
      <View
        style={[calculatorStyles.calculateContainer, globalStyles.marginTop4]}
      >
        <CalculatorFormField label="Altura:" style={calculatorStyles.width50}>
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setHeight(parseFloat(text))}
              placeholder="Ex.: 175"
            />
            <StyledText style={calculatorStyles.whiteText}>Cm</StyledText>
          </View>
        </CalculatorFormField>
        {errorHeightMessage && (
          <StyledText style={calculatorStyles.errorText}>
            Altura inválida. Exemplo válido: 175
          </StyledText>
        )}
        <CalculatorFormField label="Sexo:" style={calculatorStyles.width50}>
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue) => setSex(itemValue)}
            style={calculatorStyles.pickerStyle}
          >
            <Picker.Item
              key={'Masculino'}
              label={'Masculino'}
              value={'Masculino'}
            />
            <Picker.Item
              key={'Feminino'}
              label={'Feminino'}
              value={'Feminino'}
            />
          </Picker>
        </CalculatorFormField>
        <CalculatorFormField label="Idade:" style={calculatorStyles.width50}>
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setAge(parseFloat(text))}
              placeholder="Ex.: 50"
            />
            <StyledText style={calculatorStyles.whiteText}>Anos</StyledText>
          </View>
          {errorAgeMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Idade inválida. Exemplo válido: 18
            </StyledText>
          )}
        </CalculatorFormField>
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
        <TextButton
          style={[calculatorStyles.calculateButton, globalStyles.marginTop3]}
          onPress={bodyWaterCalculateHandler}
        >
          Calcular
        </TextButton>
      </View>
      {result !== 0 && (
        <ResultCalculateContainer
          calculatorName={AllCalculators.TotalBodyWater}
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
