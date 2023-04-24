import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'

import { MyHealthModule } from './src/modules'
import Calculators from './src/modules/calculators/Calculators'
import Codes from './src/modules/codes/Codes'
import CodeQuery from './src/modules/codes/pages/Consulta'
import Diary from './src/modules/diary/Diary'
import { Login } from './src/modules/login/pages/Login'
import Medicines from './src/modules/medicines/Medicines'
import Home from './src/modules/home/Home'
import { RouteParams } from './src/routeParams'
import { GREEN_700 } from './src/shared/ui/colors'

import { AllCalculators } from '@modules/calculators/calculatorsEnum'
import AlcoholInBlood from '@modules/calculators/pages/AlcoholInBlood'
import BodySurface from '@modules/calculators/pages/BodySurface'
import Calcium from '@modules/calculators/pages/Calcium'
import Calories from '@modules/calculators/pages/Calories'
import GestationalAge from '@modules/calculators/pages/GestationalAge'
import IMC from '@modules/calculators/pages/IMC'
import Menopause from '@modules/calculators/pages/Menopause'
import PAM from '@modules/calculators/pages/PAM'
import SomnolenceEpworth from '@modules/calculators/pages/SomnolenceEpworth'
import TotalBodyWater from '@modules/calculators/pages/TotalBodyWater'
import CalculatorsHistory from '@modules/calculators/pages/CalculatorsHistory'

export const Stack = createNativeStackNavigator<RouteParams>()

export default function App() {
  const components: Record<string, any> = {
    [MyHealthModule.Calculators]: Calculators,
    [MyHealthModule.Codes]: Codes,
    [MyHealthModule.Diary]: Diary,
    [MyHealthModule.Medicines]: Medicines,
  }

  const calculators: Record<string, any> = {
    [AllCalculators.IMC]: IMC,
    [AllCalculators.PAM]: PAM,
    [AllCalculators.AlcoholInBlood]: AlcoholInBlood,
    [AllCalculators.GestationalAge]: GestationalAge,
    [AllCalculators.Menopause]: Menopause,
    [AllCalculators.SomnolenceEpworth]: SomnolenceEpworth,
    [AllCalculators.BodySurface]: BodySurface,
    [AllCalculators.TotalBodyWater]: TotalBodyWater,
    [AllCalculators.Calcium]: Calcium,
    [AllCalculators.Calories]: Calories,
  }

  const TITLE_STYLES: Partial<NativeStackNavigationOptions> = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: GREEN_700,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: '600',
      fontFamily: 'Inter-Regular',
    },
  }

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}
    >
      {/* Definição de rotas do aplicativo */}
      <Stack.Navigator initialRouteName="Login" screenOptions={TITLE_STYLES}>
        {/* Tela de login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>

        {/* Tela principal (Home) */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My Health' }}
        ></Stack.Screen>

        {/* Pontos de entrada dos módulos */}
        {Object.values(MyHealthModule).map((module) => (
          <Stack.Screen
            key={module}
            name={module}
            component={components[module]}
          ></Stack.Screen>
        ))}

        {/* Telas do módulo de códigos */}
        <Stack.Screen name="Consulta" component={CodeQuery}></Stack.Screen>

        {/* Telas do módulo de Calculadoras */}
        {Object.values(AllCalculators).map((calculator) => (
          <Stack.Screen
            key={calculator}
            name={calculator}
            component={calculators[calculator]}
          ></Stack.Screen>
        ))}
        <Stack.Screen
          name="CalculatorsHistory"
          component={CalculatorsHistory}
          options={{ title: 'Histórico de Calculadoras' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
