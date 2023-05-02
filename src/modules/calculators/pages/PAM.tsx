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
import PAMCalculator from '../models/calculators/PAMCalculator'
import { calculatorStyles } from '../utils/calculatorStyles'

type CalculatorsProps = NativeStackScreenProps<RouteParams, AllCalculators.PAM>

export default function PAM(props: CalculatorsProps) {
  const pam = new PAMCalculator()

  const [pas, setPas] = useState(0)
  const [pad, setPad] = useState(0)
  const [result, setResult] = useState(0)
  const [resultDescription, setResultDescription] = useState('')
  const [errorPasMessage, setErrorPasMessage] = useState(false)
  const [errorPadMessage, setErrorPadMessage] = useState(false)

  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY === 0) {
      scrollViewRef.current?.scrollTo({ y: -100, animated: true })
    }
  }

  function calculatePAM() {
    if (Boolean(pas) && Boolean(pad)) {
      setErrorPasMessage(false)
      setErrorPadMessage(false)
      pam.setPas(pas)
      pam.setPad(pad)
      pam.calculate()
      setResultDescription(pam.printResultDescription())
      setResult(pam.result)
    } else {
      Boolean(pas) ? setErrorPasMessage(false) : setErrorPasMessage(true)
      Boolean(pad) ? setErrorPadMessage(false) : setErrorPadMessage(true)
    }
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.rootContainer}
    >
      <TittleContainer name={AllCalculators.PAM} />
      <DescriptionContainer description={pam.description} />
      <View
        style={[calculatorStyles.calculateContainer, globalStyles.marginTop4]}
      >
        <CalculatorFormField
          label="PA Sistólica:"
          style={calculatorStyles.width50}
        >
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setPas(parseFloat(text))}
              placeholder="Ex.: 85"
            />
            <StyledText style={calculatorStyles.whiteText}>mmHg</StyledText>
          </View>
          {errorPasMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Pas inválida. Exemplo válido: 85
            </StyledText>
          )}
        </CalculatorFormField>
        <CalculatorFormField
          label="PA Diastólica:"
          style={calculatorStyles.width50}
        >
          <View style={calculatorStyles.calculateInputContainer}>
            <TextBox
              style={calculatorStyles.calculateInput}
              keyboardType="numeric"
              onChangeText={(text) => setPad(parseFloat(text))}
              placeholder="Ex.: 130"
            />
            <StyledText style={calculatorStyles.whiteText}>mmHg</StyledText>
          </View>
          {errorPadMessage && (
            <StyledText style={calculatorStyles.errorText}>
              Pad inválida. Exemplo válido: 130
            </StyledText>
          )}
        </CalculatorFormField>
        <TextButton
          style={[calculatorStyles.calculateButton, globalStyles.marginTop3]}
          onPress={calculatePAM}
        >
          Calcular
        </TextButton>
      </View>
      {result !== 0 && (
        <ResultCalculateContainer
          calculatorName={AllCalculators.PAM}
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
