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

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 5;

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View className="flex items-center mt-10 gap-7 justify-center w-[60px] h-[56px]">
      <Image
        source={icon}
        contentFit="contain"
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "white" : color,
        }}
      />
    </View>
  );
};

export default function TabLayout() {
  const activeIndex = useSharedValue(0);

  const translateX = useDerivedValue(() =>
    withSpring(activeIndex.value * TAB_WIDTH, {
      damping: 12,
      stiffness: 120,
    })
  );

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#E94057",
          tabBarInactiveTintColor: "#777777",
          tabBarStyle: {
            height: 84,
            position: "absolute",
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            backgroundColor: "white",
            borderTopWidth: 0,
            elevation: 5,
          },
          tabBarBackground: () => (
            <View className="flex-1 relative">
              {/* moving active circle */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 10,
                    left: TAB_WIDTH / 2 - 28,
                    width: 56,
                    height: 56,
                    borderRadius: 28,
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
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.events} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heart}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.chat2}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
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
  );
}
