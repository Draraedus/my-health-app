import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { globalStyles } from '@shared/ui/globalStyles'
import { StyledText } from '@shared/ui/components'

import { AllCalculators } from '../calculatorsEnum'
import { RouteParams } from '../../../routeParams'

type CalculatorsProps = NativeStackScreenProps<
  RouteParams,
  AllCalculators.TotalBodyWater
>

export default function TotalBodyWater(props: CalculatorsProps) {
  return (
    <View style={globalStyles.defaultContainer}>
      <StyledText>Hello, world</StyledText>
    </View>
  )
}
