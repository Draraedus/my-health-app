import { useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { globalStyles } from '@shared/ui/globalStyles'
import { StyledText, TextBox, TextButton } from '@shared/ui/components'

import { RouteParams } from '../../../routeParams'
import { CalculatorFormField } from '../components/CalculatorFormField'
import { GRAY_300, GRAY_600, GREEN_600 } from '@shared/ui/colors'
import { AllCalculators } from '../calculatorsEnum'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerExample from '../components/HistoryDateSelect'
import HistoryChart from '../components/HistoryGrafic'

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

  const [calculatorSelectedValue, setCalculatorSelectedValue] = useState('IMC')
  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())

  const handleChange = (event: any) => {
    console.log(event)
  }

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
            name="Data Inicio"
            date={initialDate}
            setDate={setInitialDate}
          />
          <DateTimePickerExample
            name="Data Fim"
            date={finalDate}
            setDate={setFinalDate}
          />
          <TouchableOpacity style={styles.HistoryConfirmButton}>
            <StyledText style={styles.TextGreen}>Confirmar</StyledText>
          </TouchableOpacity>
        </View>
        <HistoryChart
          points={[
            { date: new Date(2022, 2, 1), result: 12 },
            { date: new Date(2022, 2, 2), result: 25 },
            { date: new Date(2022, 2, 3), result: 30 },
            { date: new Date(2022, 2, 4), result: 28 },
            { date: new Date(2022, 2, 5), result: 34 },
          ]}
        />
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
