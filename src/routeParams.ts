import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MyHealthModule } from './modules'
import { AllCalculators } from '@modules/calculators/calculatorsEnum'

type NO_PARAMS = undefined

export type RouteParams = {
  Login: NO_PARAMS
  Home: NO_PARAMS
  News: NO_PARAMS
  PublishNews: NO_PARAMS

  // Calculadoras
  [MyHealthModule.Calculators]: NO_PARAMS
  [AllCalculators.IMC]: NO_PARAMS
  [AllCalculators.PAM]: NO_PARAMS
  [AllCalculators.AlcoholInBlood]: NO_PARAMS
  [AllCalculators.BodySurface]: NO_PARAMS
  [AllCalculators.TotalBodyWater]: NO_PARAMS
  CalculatorsHistory: NO_PARAMS

  // Diário
  [MyHealthModule.Diary]: NO_PARAMS

  // Medicamentos
  [MyHealthModule.Medicines]: NO_PARAMS

  // Noticias
  [MyHealthModule.Articles]: NO_PARAMS

  // Códigos
  [MyHealthModule.Codes]: NO_PARAMS
  Consulta: { name: string }

  ResetPassword: NO_PARAMS
}

export type Navigation = NativeStackNavigationProp<RouteParams>
