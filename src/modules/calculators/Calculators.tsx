import { ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MyHealthModule } from '../../modules'
import { RouteParams } from '../../routeParams'

import { CalculatorCard } from './components/CalculatorCard'
import { AllCalculators } from './calculatorsEnum'
import HistoryButton from './components/HistoryButton'
import { useRef } from 'react'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  MyHealthModule.Calculators
>

export default function Calculators(props: CalculatorsProps) {
  const calculators: AllCalculators[] = [
    AllCalculators.Calories,
    AllCalculators.Menopause,
    AllCalculators.IMC,
    AllCalculators.SomnolenceEpworth,
    AllCalculators.GestationalAge,
    AllCalculators.PAM,
    AllCalculators.AlcoholInBlood,
    AllCalculators.Calcium,
    AllCalculators.BodySurface,
    AllCalculators.TotalBodyWater,
  ]

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
    <>
      <ScrollView onScroll={handleScroll} ref={scrollViewRef}>
        <View>
          <View style={styles.modulesContainer}>
            {calculators.map((calculatorName) => (
              <CalculatorCard
                key={calculatorName}
                calculatorName={calculatorName}
              ></CalculatorCard>
            ))}
          </View>
        </View>
      </ScrollView>
      <HistoryButton />
    </>
  )
}

const styles = StyleSheet.create({
  modulesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})
