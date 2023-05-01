import React, { useState } from 'react'
import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { StyledText } from '@shared/ui/components'

type HistoryDateSelectProps = {
  name: string
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function HistoryDateSelect(props: HistoryDateSelectProps) {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || props.date
    props.setDate(currentDate)
    setShowDatePicker(false)
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.DateButton}
      >
        <StyledText>
          {`${props.name}: ${props.date.toLocaleDateString('pt-BR')}`}
        </StyledText>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={props.date}
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  DateButton: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
})
