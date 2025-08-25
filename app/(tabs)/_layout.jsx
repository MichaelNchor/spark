import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import icons from "../../assets/constants";
import { Provider as PaperProvider } from "react-native-paper";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="gap-1 items-center w-[60px]">
      <Image
        source={icon}
        contentFit="contain"
        style={{ width: 24, height: 24, tintColor: color }}
      />
      <Text
        className={`${focused ? "font-poppins-semibold" : "font-poppins-medium"} text-[0.6rem]`}
        style={{ color }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const TAB_COLORS = "#777777";

  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarIconStyle: {
            color: TAB_COLORS,
            backgroundColor: "#121212",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#E94057",
          tabBarStyle: {
            height: 84,
            paddingHorizontal: 20,
            paddingTop: 10,
            backgroundColor: "#121212",
            borderTopWidth: 0,
            elevation: 0,
          },
          sceneStyle: {
            backgroundColor: "#121212",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            text: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.homeOutline}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            text: "Events",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.events}
                color={color}
                focused={focused}
                name="Events"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            text: "Likes",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heartOutline}
                color={color}
                focused={focused}
                name="Likes"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            text: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.chatOutline}
                color={color}
                focused={focused}
                name="Chat"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            text: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profileOutline}
                color={color}
                focused={focused}
                name="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
