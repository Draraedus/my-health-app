import AsyncStorage from '@react-native-async-storage/async-storage'
import { CalculatorsData } from '../interface/CalculatorsData'

// Author: Jean Charles de Jesus

const getCalculations = async (
  calculatorName: string
): Promise<CalculatorsData[]> => {
  try {
    const jsonData = await AsyncStorage.getItem(`@${calculatorName}`)
    return jsonData != null ? JSON.parse(jsonData) : []
  } catch (e) {
    console.error('Error getting calculations:', e)
    return []
  }
}

export default getCalculations
