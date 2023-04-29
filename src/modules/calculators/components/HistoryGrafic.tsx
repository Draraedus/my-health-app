import React from 'react'
import { View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { GREEN_700 } from '@shared/ui/colors'

const screenWidth = Dimensions.get('window').width

type DataPoint = {
  date: Date
  result: number
}

type LineChartProps = {
  points: DataPoint[]
}

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 0.5,
  color: () => GREEN_700,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
}

export default function HistoryChart(props: LineChartProps) {
  const chartData = {
    labels: props.points.map((point) => point.date.toLocaleDateString('pt-BR')),
    datasets: [
      {
        data: props.points.map((point) => point.result),
        color: () => chartConfig.color(),
        strokeWidth: 2,
      },
    ],
  }

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth * 0.8}
        height={450}
        fromZero={true}
        chartConfig={chartConfig}
        withInnerLines={false}
        verticalLabelRotation={70}
      />
    </View>
  )
}
