import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ImageBackground, Image } from "expo-image";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { dummyUsers } from "../../data/mockData";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ChatBoxField from "../../components/ChatBoxField";
import BottomSheetModal from "../../components/BottomSheetModal";
import ChatSendModal from "../../components/ChatSendModal";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ChatGiftModal from "../../components/ChatGiftModal";

const ChatRoom = () => {
  const { id } = useLocalSearchParams();
  const [isSendOptionsVisible, setSendOptionsIsVisible] = useState(false);
  const [isGiftsOptionsVisible, setGiftOptionsIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 20, backgroundColor: "#121212" }}
    >
      {/* Top bar */}
      <View className="w-full flex-row items-center pt-4 my-2">
        <View className="flex w-full flex-row items-center justify-between gap-3">
          <CustomButtonWithIcon
            icon={icons.back}
            iconWidth={24}
            iconHeight={24}
            iconColor="#777777"
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
              <View className="flex-row gap-1 mt-2 justify-center">
                <Text className="text-xs text-white font-poppins-medium">
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

          {/* Call & menu */}
          <View className="flex-row items-center">
            <CustomButtonWithIcon
              icon={icons.videoCall}
              iconWidth={24}
              iconHeight={24}
              iconColor="#777777"
              handlePress={() => {}}
              containerStyles="w-[50px] h-[50px] items-center justify-center"
              isOutline
            />
            <CustomButtonWithIcon
              icon={icons.phoneCall}
              iconWidth={24}
              iconHeight={24}
              iconColor="#777777"
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
      >
        <View className="bg-[#1e1e1e] rounded-xl rounded-tl-none p-3 my-2 self-start">
          <Text className="text-white font-poppins-regular">Hey there 👋</Text>
        </View>
        <View className="bg-[#E94057] rounded-xl rounded-tr-none p-3 my-2 self-end">
          <Text className="text-white font-poppins-regular">Hello!</Text>
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
            icon={icons.plus}
            iconWidth={24}
            iconHeight={24}
            iconColor="#ffffff"
            containerStyles="w-[50px] h-[50px]"
            handlePress={() => setSendOptionsIsVisible(true)}
            isOutline
          />

          {/* Input box */}
          <View className="flex-1 justify-center items-center mr-2">
            <ChatBoxField
              value={message}
              handleChangeText={setMessage}
              placeholder="Type a message ..."
              onGiftPress={() => setGiftOptionsIsVisible(true)}
              isDarkMode
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
        <ChatGiftModal
          // onSendGift={(gift) => {
          //   console.log("Gift sent:", gift);
          //   setGiftOptionsIsVisible(false);
          // }}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default ChatRoom;
