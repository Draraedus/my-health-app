import { useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { globalStyles } from '@shared/ui/globalStyles'
import { StyledText } from '@shared/ui/components'

import { RouteParams } from '../../../routeParams'
import { CalculatorFormField } from '../components/CalculatorFormField'
import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { AllCalculators } from '../calculatorsEnum'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerExample from '../components/HistoryDateSelect'
import HistoryChart from '../components/HistoryGrafic'
import { CalculatorsData } from '../interface/CalculatorsData'
import getHistory from '../services/getHistory'

// Author: Adriel Luiz Santana dos Santos

type CalculatorHistoryProps = NativeStackScreenProps<
  RouteParams,
  'CalculatorsHistory'
>

export default function CalculatorsHistory(props: CalculatorHistoryProps) {
  const calculators: AllCalculators[] = [
    AllCalculators.IMC,
    AllCalculators.PAM,
    AllCalculators.AlcoholInBlood,
    AllCalculators.BodySurface,
    AllCalculators.TotalBodyWater,
  ]

  const [calculatorSelectedValue, setCalculatorSelectedValue] = useState(
    AllCalculators.IMC
  )
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const [calculatorHistory, setCalculatorHistory] = useState<CalculatorsData[]>(
    []
  )

  const scrollViewRef = useRef<ScrollView>(null)

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } }
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY === 0) {
      scrollViewRef.current?.scrollTo({ y: -100, animated: true })
    }
  }

  return (
    <ScrollView onScroll={handleScroll} ref={scrollViewRef}>
      <View style={[styles.primaryContainer, globalStyles.marginTop3]}>
        <View style={styles.HistoryConfigContainer}>
          <CalculatorFormField label="Calculadora:">
            <Picker
              selectedValue={calculatorSelectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setCalculatorSelectedValue(itemValue)
              }
              style={styles.InputContainer}
            >
              {calculators.map((calculatorName) => (
                <Picker.Item
                  key={calculatorName}
                  label={calculatorName}
                  value={calculatorName}
                />
              ))}
            </Picker>
          </CalculatorFormField>
          <DateTimePickerExample
            name="Data Inicial"
            date={initialDate}
            setDate={setInitialDate}
          />
          <DateTimePickerExample
            name="Data Final"
            date={finalDate}
            setDate={setFinalDate}
          />
          <TouchableOpacity
            style={styles.HistoryConfirmButton}
            onPress={() =>
              getHistory(
                calculatorSelectedValue,
                initialDate.toLocaleDateString('pt-BR'),
                finalDate.toLocaleDateString('pt-BR'),
                setCalculatorHistory
              )
            }
          >
            <StyledText style={styles.TextGreen}>Confirmar</StyledText>
          </TouchableOpacity>
        </View>
        {calculatorHistory.length !== 0 && (
          <HistoryChart points={calculatorHistory} />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  primaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 40,
  },
  HistoryConfigContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    width: '80%',
    padding: 32,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    backgroundColor: GREEN_600,
  },
  InputContainer: {
    backgroundColor: '#ffffff',

    borderRadius: 4,

    borderWidth: 2,
    borderColor: GRAY_300,
  },
  HistoryConfirmButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 8,

    alignSelf: 'center',

    borderRadius: 10,
  },
  TextGreen: {
    color: GREEN_600,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
