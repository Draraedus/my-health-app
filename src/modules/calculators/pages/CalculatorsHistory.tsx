import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { globalStyles } from '@shared/ui/globalStyles'
import { StyledText } from '@shared/ui/components'

import { RouteParams } from '../../../routeParams'

type CalculatorHistoryProps = NativeStackScreenProps<
  RouteParams,
  'CalculatorsHistory'
>

export default function CalculatorsHistory(props: CalculatorHistoryProps) {
  return (
    <View style={globalStyles.defaultContainer}>
      <StyledText>Hello, world</StyledText>
    </View>
  )
}
