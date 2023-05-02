import { View, Text } from 'react-native'
import { CalculatorsData } from '../interface/CalculatorsData'

type HistoryLineChartDotProps = {
  index: number
  points: CalculatorsData[]
}

const HistoryLineChartDot: React.FC<HistoryLineChartDotProps> = ({
  index,
  points,
}) => {
  const point = points[index]

  return (
    <View style={{ backgroundColor: 'white', padding: 8 }}>
      <Text>Resultado: {point.result}</Text>
      <Text>Data: {point.data}</Text>
    </View>
  )
}

export default HistoryLineChartDot
