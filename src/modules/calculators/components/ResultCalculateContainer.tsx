import { GRAY_300, GREEN_600 } from '@shared/ui/colors'
import { StyledText, TextBox, TextButton } from '@shared/ui/components'
import { globalStyles } from '@shared/ui/globalStyles'
import { View, StyleSheet } from 'react-native'

export default function ResultCalculateContainer(props: any) {
  return (
    <View
      style={[
        styles.primaryContainer,
        globalStyles.marginTop3,
        globalStyles.marginBottom3,
      ]}
    >
      <View style={styles.resultContainer}>
        <StyledText style={styles.fontWhite}>Resultado:</StyledText>
        <TextBox
          editable={false}
          keyboardType="numeric"
          value={props.result}
          style={styles.textBoxStyle}
        />
        <TextButton style={styles.buttonSave}>Salvar</TextButton>
      </View>
      <View
        style={[styles.resultDescriptionContainer, globalStyles.marginTop2]}
      >
        <StyledText style={styles.fontWhite}>
          {props.resultDescription}
        </StyledText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  primaryContainer: {
    width: '80%',
    padding: 32,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: GRAY_300,

    backgroundColor: GREEN_600,
  },
  resultContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 6,
    alignItems: 'center',
  },
  resultDescriptionContainer: {},
  fontWhite: {
    color: '#ffffff',
    fontSize: 16,
  },
  textBoxStyle: {
    width: '30%',
    height: 32,
    backgroundColor: '#ffffff',
  },
  buttonSave: {
    borderWidth: 2,
    borderColor: GRAY_300,
    borderRadius: 4,
    height: 36,
    padding: 2,
    outlineStyle: 'none',
    backgroundColor: '#ffffff',
  },
})
