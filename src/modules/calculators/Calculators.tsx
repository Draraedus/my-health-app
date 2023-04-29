import { ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MyHealthModule } from '../../modules'
import { RouteParams } from '../../routeParams'

import { AllCalculators } from './calculatorsEnum'
import { MenuCalculatorItem } from './components/MenuCalculatorItem'
import MenuHistoryButton from './components/MenuHistoryButton'
import { useRef } from 'react'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  MyHealthModule.Calculators
>

export default function Calculators(props: CalculatorsProps) {
  const calculators: AllCalculators[] = [
    AllCalculators.IMC,
    AllCalculators.PAM,
    AllCalculators.AlcoholInBlood,
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
              <MenuCalculatorItem
                key={calculatorName}
                calculatorName={calculatorName}
              ></MenuCalculatorItem>
            ))}
          </View>
        </View>
      </ScrollView>
      <MenuHistoryButton />
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
