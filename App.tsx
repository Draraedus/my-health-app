import { ResetPassword } from '@modules/reset-password/ResetPassword'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { Toast } from '@shared/ui/components/toast/Toast'
import { useFonts } from 'expo-font'
import { View } from 'react-native'
import { MyHealthModule } from './src/modules'
import Calculators from './src/modules/calculators/Calculators'
import Codes from './src/modules/codes/Codes'
import CodeQuery from './src/modules/codes/pages/Consulta'
import Diary from './src/modules/diary/Diary'
import Article from './src/modules/articles/Articles'
import Profile from '@modules/profile/Profile'
import EditProfile from '@modules/profile/pages/EditProfile'
import { NewsForm } from './src/modules/articles/pages/PostArticle'
import { Login } from './src/modules/login/pages/Login'
import Medicines from './src/modules/medicines/Medicines'
import { RouteParams } from './src/routeParams'
import { GREEN_700 } from './src/shared/ui/colors'
import { ToastProvider } from '@shared/ui/components/toast/ToastProvider'
import Home from '@modules/home/Home'
import { LoadingInterceptor } from '@shared/ui/components/loading/LoadingInterceptor'
import { useEffect, useState } from 'react'
import { getSession } from '@shared/services/auth/session'
import {
  goToProfile,
  goToEditProfile,
} from './src/modules/profile/components/Button'
import { AllCalculators } from '@modules/calculators/calculatorsEnum'
import AlcoholInBlood from '@modules/calculators/pages/AlcoholInBlood'
import BodySurface from '@modules/calculators/pages/BodySurface'
import IMC from '@modules/calculators/pages/IMC'
import PAM from '@modules/calculators/pages/PAM'
import TotalBodyWater from '@modules/calculators/pages/TotalBodyWater'
import CalculatorsHistory from '@modules/calculators/pages/CalculatorsHistory'

export const Stack = createNativeStackNavigator<RouteParams>()

export default function App() {
  const components: Record<string, any> = {
    [MyHealthModule.Calculators]: Calculators,
    [MyHealthModule.Codes]: Codes,
    [MyHealthModule.Diary]: Diary,
    [MyHealthModule.Medicines]: Medicines,
    [MyHealthModule.Articles]: Article,
  }

  const calculators: Record<string, any> = {
    [AllCalculators.IMC]: IMC,
    [AllCalculators.PAM]: PAM,
    [AllCalculators.AlcoholInBlood]: AlcoholInBlood,
    [AllCalculators.BodySurface]: BodySurface,
    [AllCalculators.TotalBodyWater]: TotalBodyWater,
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

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession()

      if (session !== null) {
        setUserIsLoggedIn(true)
      }
    }

    fetchSession()
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ width: '100%' }}>
      <ToastProvider>
        <LoadingInterceptor></LoadingInterceptor>
        <Toast></Toast>
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
          <Stack.Navigator
            initialRouteName={userIsLoggedIn ? 'Home' : 'Login'}
            screenOptions={TITLE_STYLES}
          >
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
              options={{ title: 'My Health', headerRight: goToProfile }}
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

            {/* Tela de resetar senha */}
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerTitle: 'Redefinir senha',
                headerLeft: () => null,
              }}
            ></Stack.Screen>

            {/* Tela de publicar noticias */}
            <Stack.Screen
              name="PublishNews"
              component={NewsForm}
              options={{ title: 'Publicar notícia' }}
            ></Stack.Screen>

            {/* Tela de perfil */}
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: 'Perfil', headerRight: goToEditProfile }}
            ></Stack.Screen>

            {/* Tela de editar perfil */}
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ title: 'Editar Perfil' }}
            ></Stack.Screen>

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
      </ToastProvider>
    </View>
  )
}
