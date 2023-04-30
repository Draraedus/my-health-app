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
import PAMCalculator from '../models/calculators/PAMCalculator'

type CalculatorsProps = NativeStackScreenProps<RouteParams, AllCalculators.PAM>

export default function PAM(props: CalculatorsProps) {
  const pam = new PAMCalculator()

  const [pas, setPas] = useState(0)
  const [pad, setPad] = useState(0)
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

  function calculatePAM() {
    pam.setPas(pas)
    pam.setPad(pad)
    pam.calculate()
    setResultDescription(pam.printResultDescription())
    setResult(pam.result)
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      ref={scrollViewRef}
      contentContainerStyle={styles.primaryContainer}
    >
      <TittleContainer name={AllCalculators.PAM} />
      <DescriptionContainer description={pam.description} />
      <View style={[styles.pamCalculateContainer, globalStyles.marginTop4]}>
        <CalculatorFormField label="PA Sistólica: (mmHg)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setPas(parseFloat(text))}
            placeholder="Ex.: 85"
          />
        </CalculatorFormField>
        <CalculatorFormField label="PA Diastólica: (mmHg)">
          <TextBox
            style={styles.textBoxStyle}
            keyboardType="numeric"
            onChangeText={(text) => setPad(parseFloat(text))}
            placeholder="Ex.: 130"
          />
        </CalculatorFormField>
        <TextButton
          style={[styles.buttonCalculate, globalStyles.marginTop3]}
          onPress={calculatePAM}
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
  pamCalculateContainer: {
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
