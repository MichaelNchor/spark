import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../../assets/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 5;
const BASE_BAR_H = 52; // visual height (without safe area)
const CIRCLE = 46;

const TabIcon = ({ icon, color, focused }) => (
  <View
    // no big margins; keep the icon centered in the item box
    className="items-center justify-center w-[56px] h-[56px]"
  >
    <Image
      source={icon}
      contentFit="contain"
      style={{ width: 24, height: 24, tintColor: focused ? "white" : color }}
    />
  </View>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const activeIndex = useSharedValue(0);
  const translateX = useDerivedValue(() =>
    withSpring(activeIndex.value * TAB_WIDTH, { damping: 12, stiffness: 100 })
  );
  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const barHeight = BASE_BAR_H + insets.bottom;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#E94057",
            tabBarInactiveTintColor: "#777777",
            tabBarHideOnKeyboard: true, // 👈 hides when typing
            tabBarStyle: {
              height: barHeight, // 👈 include safe area
              paddingBottom: insets.bottom, // 👈 sit flush to edge
              paddingTop: 8,
              position: "absolute",
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              backgroundColor: "white",
              borderTopWidth: 0,
              elevation: 5,
            },
            tabBarBackground: () => (
              <View style={{ flex: 1 }}>
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      // center the circle vertically inside visible bar area
                      top: (BASE_BAR_H - CIRCLE) / 2, // not affected by inset
                      left: TAB_WIDTH / 2 - CIRCLE / 2,
                      width: CIRCLE,
                      height: CIRCLE,
                      borderRadius: CIRCLE / 2,
                      overflow: "hidden",
                    },
                    animatedCircleStyle,
                  ]}
                >
                  <LinearGradient
                    colors={["#fd297b", "#ff5864", "#ff655b"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flex: 1 }}
                  />
                </Animated.View>
              </View>
            ),
          }}
          screenListeners={{
            state: (e) => {
              activeIndex.value = e.data.state.index;
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.home} color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="events"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.events} color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="likes"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.heart} color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icons.chat2} color={color} focused={focused} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.settings}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
