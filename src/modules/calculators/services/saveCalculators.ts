import AsyncStorage from '@react-native-async-storage/async-storage'
import { CalculatorsData } from '../interface/CalculatorsData'

const saveCalculations = async (
  calculatorName: string,
  calculations: CalculatorsData[]
) => {
  try {
    const jsonData = JSON.stringify(calculations)
    await AsyncStorage.setItem(`@${calculatorName}`, jsonData)
  } catch (e) {
    console.error('Error saving calculations:', e)
  }
}

export default saveCalculations
