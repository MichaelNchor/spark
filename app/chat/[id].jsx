import { useLocalSearchParams, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ImageBackground, Image } from "expo-image";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { dummyUsers } from "../../data/mockData";
import ChatBoxField from "../../components/ChatBoxField";
import BottomSheetModal from "../../components/BottomSheetModal";
import ChatSendModal from "../../components/ChatSendModal";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ChatGiftModal from "../../components/ChatGiftModal";

const COLORS = {
  bg: "#F5F6FA",
  headerName: "#0F172A",
  inBubbleBg: "#F3F4F6",
  inBubbleText: "#111827",
  outBubbleBg: "#E94057",
  outBubbleText: "#FFFFFF",
};

const ChatRoom = () => {
  const { id } = useLocalSearchParams();
  const [isSendOptionsVisible, setSendOptionsIsVisible] = useState(false);
  const [isGiftsOptionsVisible, setGiftOptionsIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: COLORS.bg }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center pt-4 my-2">
        <View className="flex w-full flex-row items-center justify-between gap-3">
          <CustomButtonWithIcon
            icon={icons.back}
            iconWidth={24}
            iconHeight={24}
            iconColor="black"
            handlePress={() => router.back()}
            containerStyles="w-[50px] h-[50px] items-center justify-center"
            isOutline
          />

          {/* User avatar + name */}
          <TouchableOpacity onPress={() => router.push(`user/${id}`)}>
            <View className="flex-col ml-12 items-center">
              <ImageBackground
                source={{ uri: dummyUsers[0].media[0].uri }}
                contentFit="cover"
                style={{ height: 60, width: 60 }}
                imageStyle={{ borderRadius: 50 }}
              />
              <View className="flex-row gap-1 mt-2 justify-center items-center">
                <Text className="text-xs font-poppins-medium" style={{ color: COLORS.headerName }}>
                  {dummyUsers[0].name}
                </Text>
                {dummyUsers[0].isVerified && (
                  <Image
                    source={icons.verified}
                    style={{ width: 14, height: 14 }}
                    contentFit="contain"
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Call buttons */}
          <View className="flex-row items-center">
            <CustomButtonWithIcon
              icon={icons.videoCall}
              iconWidth={24}
              iconHeight={24}
              iconColor="black"
              handlePress={() => {}}
              containerStyles="w-[50px] h-[50px] items-center justify-center"
              isOutline
            />
            <CustomButtonWithIcon
              icon={icons.phoneCall}
              iconWidth={24}
              iconHeight={24}
              iconColor="black"
              handlePress={() => {}}
              containerStyles="w-[50px] h-[50px] items-center justify-center"
              isOutline
            />
          </View>
        </View>
      </View>

      {/* Chat messages */}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 96 }} // extra room above home indicator
      >
        {/* incoming */}
        <View
          className="rounded-xl rounded-tl-none p-3 my-2 self-start"
          style={{
            backgroundColor: COLORS.inBubbleBg,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          }}
        >
          <Text className="font-poppins-regular" style={{ color: COLORS.inBubbleText }}>
            Hey there 👋
          </Text>
        </View>

        {/* outgoing */}
        <View
          className="rounded-xl rounded-tr-none p-3 my-2 self-end"
          style={{
            backgroundColor: COLORS.outBubbleBg,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          }}
        >
          <Text className="font-poppins-regular" style={{ color: COLORS.outBubbleText }}>
            Hello!
          </Text>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={70}
      >
        <View className="flex-row w-full items-center mb-4 justify-between px-2 py-3">
          {/* Plus button */}
          <CustomButtonWithIcon
            icon={icons.paperClip}
            iconWidth={24}
            iconHeight={24}
            containerStyles="w-[50px] h-[50px]"
            handlePress={() => {
              setGiftOptionsIsVisible(false); // Close gift modal if open
              setSendOptionsIsVisible(true);
            }}
            isOutline
          />

          {/* Input box */}
          <View className="flex-1 justify-center items-center mr-2">
            <ChatBoxField
              value={message}
              handleChangeText={setMessage}
              placeholder="Type a message ..."
              onGiftPress={() => {
                setSendOptionsIsVisible(false); // Close send modal if open
                setGiftOptionsIsVisible(true);
              }}
              isDarkMode={false}
            />
          </View>

          {/* Mic / Send button (animated) */}
          {message.length === 0 ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <CustomButtonWithIcon
                icon={icons.microphone}
                iconWidth={22}
                iconHeight={22}
                iconColor="#ffffff"
                containerStyles="w-[40px] h-[40px] items-center justify-center"
                isOutline={false}
                handlePress={() => {
                  console.log("Record:", message);
                  setMessage("");
                }}
              />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <CustomButtonWithIcon
                icon={icons.send}
                iconWidth={22}
                iconHeight={22}
                iconColor="#ffffff"
                containerStyles="w-[40px] h-[40px] items-center justify-center"
                isOutline={false}
                handlePress={() => {
                  console.log("Send:", message);
                  setMessage("");
                }}
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Bottom sheet menu */}
      <BottomSheetModal
        visible={isSendOptionsVisible}
        onClose={() => setSendOptionsIsVisible(false)}
      >
        <ChatSendModal />
      </BottomSheetModal>

      {/* Gifts sheet menu */}
      <BottomSheetModal
        visible={isGiftsOptionsVisible}
        onClose={() => setGiftOptionsIsVisible(false)}
        header="🎁 Send a Gift"
      >
        <ChatGiftModal />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default ChatRoom;
