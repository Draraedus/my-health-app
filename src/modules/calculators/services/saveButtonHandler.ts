import { CalculatorsData } from '../interface/CalculatorsData'
import getCalculations from './getCalculators'
import saveCalculations from './saveCalculators'

const saveButtonHandler = async (
  calcullatorName: string,
  data: string,
  result: number
) => {
  const calculation: CalculatorsData = { result, data }
  const calculators = await getCalculations(calcullatorName)
  calculators.push(calculation)
  await saveCalculations(calcullatorName, calculators)
}

export default saveButtonHandler
