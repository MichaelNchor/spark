import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  useDerivedValue,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../../assets/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_W } = Dimensions.get("window");

// Layout constants
const PADDING_H = 30;       // inner horizontal padding (left + right applied via paddingHorizontal)
const BASE_BAR_H = 52;      // visual height (without bottom safe area)
const CIRCLE = 46;          // highlight circle size
const TABS_COUNT = 5;

// map route names to indices so we can animate immediately on press
const ORDER = ["home", "events", "likes", "chat", "settings"];

// Create an animated version of expo-image
const AnimatedImage = Animated.createAnimatedComponent(Image);

// Icon that tints based on activeIndex instead of React Navigation's focused flag
const TabIcon = ({ icon, idx, activeIndex }) => {
  // animate 0 -> 1 when this tab is the active one
  const progress = useDerivedValue(() =>
    withTiming(activeIndex.value === idx ? 1 : 0, {
      duration: 160,
      easing: Easing.out(Easing.quad),
    })
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      tintColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#777777", "#FFFFFF"] // inactive gray -> active white
      ),
    };
  });

  return (
    <View className="items-center justify-center w-[56px] h-[56px]">
      <AnimatedImage
        source={icon}
        contentFit="contain"
        style={[{ width: 24, height: 24 }, rStyle]}
      />
    </View>
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const INNER_W = SCREEN_W - PADDING_H * 2;
  const TAB_WIDTH = INNER_W / TABS_COUNT;

  const activeIndex = useSharedValue(0);

  const translateXCore = useDerivedValue(() =>
    // quicker, deterministic slide
    withTiming(activeIndex.value * TAB_WIDTH, {
      duration: 160,
      easing: Easing.out(Easing.quad),
    })
  );

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateXCore.value + PADDING_H },
    ],
  }));

  const barHeight = BASE_BAR_H + insets.bottom;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Tabs
          // Enable lazy mounting so switching doesn't jank when a tab mounts a big tree
          sceneContainerStyle={{ backgroundColor: "transparent" }}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#E94057",
            tabBarInactiveTintColor: "#777777",
            tabBarHideOnKeyboard: true,
            lazy: true,                 // mount screens on first focus
            lazyPreloadDistance: 0,     // no preloading to keep main thread free
            tabBarStyle: {
              height: barHeight,
              paddingBottom: insets.bottom,
              paddingTop: 8,
              paddingHorizontal: PADDING_H, // 👈 inner padding (what you asked for)
              position: "absolute",
              borderTopRightRadius: 24,
              borderTopLeftRadius: 24,
              backgroundColor: "white",
              borderTopWidth: 0,
              elevation: 5,
            },
            tabBarBackground: () => (
              <View style={{ flex: 1 }}>
                {/* Moving highlight circle */}
                <Animated.View
                  // perf flags to keep this layer on GPU
                  renderToHardwareTextureAndroid
                  shouldRasterizeIOS
                  pointerEvents="none"
                  style={[
                    {
                      position: "absolute",
                      top: (BASE_BAR_H - CIRCLE) / 2,     // center vertically in visual area
                      left: TAB_WIDTH / 2 - CIRCLE / 2,   // start centered under first tab (pre-translate)
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
          // make listeners a function so we get the route
          screenListeners={({ route }) => ({
            // 1) Kick off the animation immediately on press (optimistic)
            tabPress: () => {
              const idx = ORDER.indexOf(route.name);
              if (idx >= 0) activeIndex.value = idx;
            },
            // 2) Also sync to the actual state change (authoritative)
            state: (e) => {
              activeIndex.value = e.data.state.index;
            },
          })}
        >
          <Tabs.Screen
            name="home"
            options={{
              tabBarIcon: () => (
                <TabIcon icon={icons.home} idx={0} activeIndex={activeIndex} />
              ),
            }}
          />
          <Tabs.Screen
            name="events"
            options={{
              tabBarIcon: () => (
                <TabIcon icon={icons.events} idx={1} activeIndex={activeIndex} />
              ),
            }}
          />
          <Tabs.Screen
            name="likes"
            options={{
              tabBarIcon: () => (
                <TabIcon icon={icons.heart} idx={2} activeIndex={activeIndex} />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              tabBarIcon: () => (
                <TabIcon icon={icons.chat2} idx={3} activeIndex={activeIndex} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              tabBarIcon: () => (
                <TabIcon icon={icons.settings} idx={4} activeIndex={activeIndex} />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
