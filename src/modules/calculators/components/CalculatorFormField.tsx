import { View, Text, ViewProps, StyleSheet } from 'react-native'
import { PropsWithChildren } from 'react'

export function FormFieldCalculator(
  props: PropsWithChildren<{ label: string }> & ViewProps
) {
  return (
    <View {...props}>
      <Text style={styles.label}>{props.label}</Text>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
})
