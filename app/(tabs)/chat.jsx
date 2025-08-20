import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { useState } from "react";
import { Portal } from "react-native-paper";
import BottomSheetModal from "../../components/BottomSheetModal";
import SwipeFilter from "../../components/SwipeFilter";
import InputField from "../../components/InputField";
import { dummyUsers } from "../../data/mockData";
import ChatStatusCard from "../../components/ChatStatusCard";
import ChatProfileCard from "../../components/ChatProfileCard";

const Chat = () => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <SafeAreaView>
      {/* Top bar with logo left, icons right */}
      <View className="w-full flex-row items-center justify-between px-4 mb-2">
        {/* Logo on the left */}
        <Image
          source={icons.logo}
          style={{ width: 120, height: 50 }}
          contentFit="cover"
        />
        {/* Right icons */}
        <View className="flex-row items-center gap-3">
          <CustomButtonWithIcon
            icon={icons.filter}
            iconWidth={24}
            iconHeight={24}
            iconColor="#777777"
            handlePress={() => setIsSettingsVisible(true)}
            containerStyles="w-[50px] h-[50px] items-start"
            isOutline={true}
          />
        </View>
      </View>

      {/* Search */}
      <View className="w-full px-6">
        <InputField placeholder="Search friends" isDarkMode />
      </View>

      {/* Status Scroll */}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "flex-center",
        }}
      >
        <View className="mt-6">
          {/* Activities */}
          <Text className="px-6 font-poppins-medium text-sm text-gray-300">
            Activities
          </Text>

          {/* Status Scroll */}
          <ScrollView
            horizontal
            bounces={false}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              paddingVertical: 10,
              marginHorizontal: 10,
              paddingRight: 20,
            }}
          >
            {dummyUsers.map((user) => (
              <ChatStatusCard key={user.id} user={user} />
            ))}
          </ScrollView>
        </View>

        <View className="px-6 mt-6">
          {/* Activities */}
          <Text className="font-poppins-medium text-sm mb-6 text-gray-300">
            Messages
          </Text>
          {dummyUsers.map((user) => (
            <ChatProfileCard key={user.id} user={user} />
          ))}
        </View>

        {/* Bottom Gap */}
        <View className="h-32 w-full" />
      </ScrollView>

      {/* Bottom Sheet */}
      <Portal>
        <BottomSheetModal
          visible={isSettingsVisible}
          onClose={() => setIsSettingsVisible(false)}
          header="Filter"
        >
          <SwipeFilter />
        </BottomSheetModal>
      </Portal>
    </SafeAreaView>
  );
};

export default Chat;
