import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { ImageBackground, Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import ChatBoxField from "../../components/ChatBoxField";
import BottomSheetModal from "../../components/BottomSheetModal";
import ChatSendModal from "../../components/ChatSendModal";
import ChatGiftModal from "../../components/ChatGiftModal";
import icons from "../../assets/constants";
import { dummyUsers } from "../../data/mockData";

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
  const insets = useSafeAreaInsets();

  const [isSendOptionsVisible, setSendOptionsIsVisible] = useState(false);
  const [isGiftsOptionsVisible, setGiftOptionsIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [headerH, setHeaderH] = useState(0);

  // dummy messages list for example
  const [messages, setMessages] = useState([
    { id: "1", fromMe: false, text: "Hey there 👋" },
    { id: "2", fromMe: true,  text: "Hello!" },
  ]);
  const listRef = useRef(null);

  const send = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), fromMe: true, text: message.trim() }]);
    setMessage("");
    requestAnimationFrame(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }} edges={['top','bottom']}>
      <View
        onLayout={e => setHeaderH(e.nativeEvent.layout.height)}
        className="w-full flex-row items-center my-2"
      >
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
                  <Image source={icons.verified} style={{ width: 14, height: 14 }} contentFit="contain" />
                )}
              </View>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <CustomButtonWithIcon icon={icons.videoCall} iconWidth={24} iconHeight={24} iconColor="black" containerStyles="w-[50px] h-[50px] items-center justify-center" isOutline />
            <CustomButtonWithIcon icon={icons.phoneCall} iconWidth={24} iconHeight={24} iconColor="black" containerStyles="w-[50px] h-[50px] items-center justify-center" isOutline />
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? headerH : -10}
      >
        <FlatList
          ref={listRef}
          data={[...messages]}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}
          renderItem={({ item }) => (
            <View
              className={`rounded-xl p-3 my-2 ${item.fromMe ? "self-end rounded-tr-none" : "self-start rounded-tl-none"}`}
              style={{ backgroundColor: item.fromMe ? COLORS.outBubbleBg : COLORS.inBubbleBg, maxWidth: "78%" }}
            >
              <Text style={{ color: item.fromMe ? COLORS.outBubbleText : COLORS.inBubbleText }}>
                {item.text}
              </Text>
            </View>
          )}
          keyboardShouldPersistTaps="handled"
        />

        {/* Input bar */}
        <View
          className="flex-row w-full justify-between px-2 items-center"
          style={{ paddingBottom: Platform.OS === "ios" ? (insets.bottom || 8) : 8 }}
        >
          <CustomButtonWithIcon
            icon={icons.paperClip}
            iconWidth={24}
            iconHeight={24}
            containerStyles="w-[50px] h-[50px]"
            handlePress={() => { setGiftOptionsIsVisible(false); setSendOptionsIsVisible(true); }}
            isOutline
          />

          <View className="flex-1 justify-center items-center mr-2">
            <ChatBoxField
              value={message}
              handleChangeText={setMessage}
              placeholder="Type a message ..."
              onGiftPress={() => { setSendOptionsIsVisible(false); setGiftOptionsIsVisible(true); }}
              isDarkMode={false}
            />
          </View>

          {message.length === 0 ? (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <CustomButtonWithIcon
                icon={icons.microphone}
                iconWidth={22}
                iconHeight={22}
                iconColor="#ffffff"
                containerStyles="w-[40px] h-[40px] items-center justify-center"
                isOutline={false}
                handlePress={() => { /* record */ }}
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
                handlePress={send}
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Sheets */}
      <BottomSheetModal visible={isSendOptionsVisible} onClose={() => setSendOptionsIsVisible(false)}>
        <ChatSendModal />
      </BottomSheetModal>
      <BottomSheetModal visible={isGiftsOptionsVisible} onClose={() => setGiftOptionsIsVisible(false)} header="🎁 Send a Gift">
        <ChatGiftModal />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default ChatRoom;
