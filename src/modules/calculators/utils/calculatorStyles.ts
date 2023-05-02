import { GRAY_300, GREEN_600, RED_500 } from '@shared/ui/colors'
import { StyleSheet } from 'react-native'

// Author: Adriel Luiz Santana dos Santos

export const calculatorStyles = StyleSheet.create({
  width50: {
    width: '50%',
  },
  calculateContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
    width: '80%',
    padding: 32,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    backgroundColor: GREEN_600,
  },
  calculateInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  pickerStyle: {
    borderWidth: 2,
    borderColor: GRAY_300,
    borderRadius: 4,
    width: '100%',
    padding: 8,
    outlineStyle: 'none',
    fontFamily: 'Inter-Regular',
    backgroundColor: '#ffffff',
  },
  calculateInput: {
    backgroundColor: '#ffffff',
  },
  calculateButton: {
    width: '40%',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 8,

    borderRadius: 4,

    borderWidth: 2,
    borderColor: GRAY_300,

    backgroundColor: '#ffffff',
  },
  whiteText: {
    color: '#ffffff',
    fontSize: 14,
  },
  errorText: {
    color: RED_500,
    fontSize: 14,
    fontWeight: 'bold',
  },
})
