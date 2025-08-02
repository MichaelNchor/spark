import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import icons from "../../assets/constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="gap-1 items-center w-[60px]">
      <Image
        source={icon}
        contentFit="contain"
        style={{ width: 24, height: 24, tintColor: color }}
      />
      <Text
        className={`${focused ? "font-poppins-bold" : "font-poppins-semibold"} text-xs`}
        style={{ color }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#E94057",
          tabBarStyle: {
            height: 84,
            paddingHorizontal: 20
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
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
          name="discover"
          options={{
            title: "Discover",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.discoverOutline}
                color={color}
                focused={focused}
                name="Discover"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="likes"
          options={{
            title: "Likes",
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
            title: "Chat",
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
            title: "Profile",
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
    </>
  );
};

export default TabLayout;
