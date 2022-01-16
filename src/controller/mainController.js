import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useMemo } from "react";
import { WelcomeScreen } from "../Screens/WelcomeScreen";
import { NoticeScreen } from "../Screens/NoticeScreen";
import { MedicationScreen } from "../Screens/MedicationScreen";
import { DoctorsScreen } from "../Screens/DoctorsScreen";
import * as Icon from "@expo/vector-icons";
import { LoginScreen } from "../Screens/LoginScreen";
import merge from "deepmerge";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import { Context } from "../utils/Context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: Theming: hier die beiden Thmes definieren
const DefaultThemeNew = {
  ...CombinedDefaultTheme,
  roundness: 2,
  colors: {
    ...CombinedDefaultTheme.colors,
    background: "#f6c453",
    primary: "#fefbe9",
    accent: "#f0a04b",
    greenDark: "#183a1d",
    greenBright: "#e1eedd",
    LoginBackground: "#cb7d8c",
  },
};

export default function MainController() {
  // TODO: Theming: hier die beiden Themes ändern

  let theme = isThemeDark ? CombinedDarkTheme : DefaultThemeNew;

  // TODO das Theme des Telefons verwenden
  /**
  const colorSchemeIdent = useColorScheme();
  let theme;
  if (colorSchemeIdent === "dark") {
    theme = CombinedDarkTheme;
  } else {
    theme = CombinedDefaultTheme;
  }

 */
  const { colors } = useTheme();
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  // Theme
  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  // User Status
  const toggleSignIn = useCallback(() => {
    return setIsSignedIn(!isSignedIn);
  }, [isSignedIn]);

  const setUserFunc = useCallback(
    (user) => {
      return setUser(user);
    },
    [user]
  );

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      toggleSignIn,
      isSignedIn,
      setUserFunc,
      user,
    }),
    [toggleTheme, isThemeDark, toggleSignIn, isSignedIn, setUserFunc, user]
  );

  return (
    <Context.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Willkommen") {
                  //iconName = focused ? "home" : "home-outline";
                  iconName = "home";
                } else if (route.name === "Ihre Medikation") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "hand-holding-medical";
                } else if (route.name === "Ärzte") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "comment-medical";
                } else if (route.name === "Notizen") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "notes-medical";
                } else if (route.name === "Login") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "key";
                }

                return (
                  <Icon.FontAwesome5
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: DefaultThemeNew.colors.greenDark,
              tabBarInactiveTintColor: DefaultThemeNew.colors.greenBright,
              tabBarStyle: { backgroundColor: DefaultThemeNew.colors.accent },
            })}
          >
            {isSignedIn ? (
              <>
                <Tab.Screen
                  name="Willkommen"
                  component={WelcomeScreen}
                  options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                      backgroundColor: DefaultThemeNew.colors.accent,
                    },
                    headerTitleAlign: "center",
                  }}
                />
                <Tab.Screen
                  name="Ihre Medikation"
                  component={MedicationScreen}
                  options={{
                    tabBarShowLabel: false,

                    headerStyle: {
                      backgroundColor: DefaultThemeNew.colors.accent,
                    },
                    headerTitleAlign: "center",
                  }}
                />
                <Tab.Screen
                  name="Ärzte"
                  component={DoctorsScreen}
                  options={{
                    tabBarShowLabel: false,

                    headerStyle: {
                      backgroundColor: DefaultThemeNew.colors.accent,
                    },
                    headerTitleAlign: "center",
                  }}
                />
                <Tab.Screen
                  name="Notizen"
                  component={NoticeScreen}
                  options={{
                    tabBarShowLabel: false,

                    headerStyle: {
                      backgroundColor: DefaultThemeNew.colors.accent,
                    },
                    headerTitleAlign: "center",
                  }}
                />
              </>
            ) : (
              <Tab.Screen
                name="Login"
                options={{
                  tabBarShowLabel: false,
                  title: "Willkommen",
                  headerStyle: {
                    backgroundColor: DefaultThemeNew.colors.background,
                  },
                  headerTitleAlign: "center",
                }}
                component={LoginScreen}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  );
}
