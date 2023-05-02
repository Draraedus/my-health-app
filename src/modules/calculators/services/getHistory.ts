import { CalculatorsData } from '../interface/CalculatorsData'
import getCalculations from './getCalculators'

function isDateStringInRange(
  dateStringToCheck: string,
  startDateString: string,
  endDateString: string
): boolean {
  const dateToCheck = new Date(dateStringToCheck.split('/').reverse().join('/'))
  const startDate = new Date(startDateString.split('/').reverse().join('/'))
  const endDate = new Date(endDateString.split('/').reverse().join('/'))
  return (
    dateToCheck.getTime() >= startDate.getTime() &&
    dateToCheck.getTime() <= endDate.getTime()
  )
}

const getHistory = async (
  calcullatorName: string,
  initialDate: string,
  finalDate: string,
  setHistory: React.Dispatch<React.SetStateAction<CalculatorsData[]>>
) => {
  const calculators = await getCalculations(calcullatorName)
  const filteredCalculators = calculators.filter(function (value) {
    return isDateStringInRange(value.data, initialDate, finalDate)
  })
  console.log(filteredCalculators)
  setHistory(filteredCalculators)
}

export default getHistory
