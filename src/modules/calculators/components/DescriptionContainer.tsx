import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { StyledText } from '@shared/ui/components'
import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { globalStyles } from '@shared/ui/globalStyles'

export default function DescriptionContainer(props: any) {
  const [showDescription, setshowDescription] = useState(false)

  const handlePress = () => {
    setshowDescription(!showDescription)
  }

  return (
    <View style={[styles.primaryContainer, globalStyles.marginTop4]}>
      <View style={styles.descriptionIntroductionContainer}>
        <StyledText style={[styles.whiteText, styles.fontSize]}>
          Entenda Como Funciona
        </StyledText>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome name="caret-down" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      {showDescription && (
        <View style={styles.descriptionContainer}>
          <StyledText style={styles.whiteText}>{props.description}</StyledText>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  primaryContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,

    backgroundColor: GREEN_600,

    borderWidth: 1,
    borderColor: GRAY_300,

    borderRadius: 10,
  },
  descriptionIntroductionContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 16,
  },
  whiteText: {
    color: '#ffffff',
  },
  fontSize: {
    fontSize: 16,
  },
  descriptionContainer: {
    paddingBottom: 8,
  },
})
