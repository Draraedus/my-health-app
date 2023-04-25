import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { StyledText } from '@shared/ui/components'
import { StyleSheet, View } from 'react-native'

export default function TittleContainer(props: any) {
  return (
    <View style={[styles.container]}>
      <StyledText style={styles.tittleText}>{props.name}</StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: GREEN_600,
    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    color: '#ffffff',
    textAlign: 'center',
  },
  tittleText: {
    color: '#ffffff',
    fontSize: 16,
  },
})
