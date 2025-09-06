import { FlatList, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../assets/constants";
import ChatProfileCard from "../../components/ChatProfileCard";
import ChatStatusCard from "../../components/ChatStatusCard";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import SearchBox from "../../components/SearchBox";
import { dummyUsers, ChatTabs } from "../../data/mockData";
import { router } from "expo-router";
import TabButtonSection from "../../components/TabButtonSection";

const Chat = () => {
  const users = dummyUsers;
  const [activeTab, setActiveTab] = useState("All");

  return (
    <SafeAreaView style={{ marginTop: 10, flex: 1, backgroundColor: "white" }}>
      {/* Top bar with logo left, icons right */}
      <View className="w-full flex-row items-center justify-between px-4 mb-2">
        {/* Logo on the left */}
        <Text className="font-poppins-medium text-2xl text-gray-900">Chat</Text>
        {/* Right icons */}
        <View className="flex-row items-center gap-3">
          <CustomButtonWithIcon
            icon={icons.shield}
            iconWidth={24}
            iconHeight={24}
            containerStyles="w-[50px] h-[50px] items-start"
            isOutline={true}
          />
        </View>
      </View>

      {/* Search */}
      <View className="w-full px-2">
        <SearchBox placeholder="Search" isDarkMode />
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
          <Text className="px-6 font-poppins-regular text-base text-black">
            Activities
          </Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id?.toString?.() ?? "add"}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 12,
              gap: 2,
              alignItems: "center",
            }}
            renderItem={({ item }) =>
              item.id === "add" ? (
                <ChatStatusCard isAdd />
              ) : (
                <ChatStatusCard user={item} />
              )
            }
          />
        </View>

        {/* ✅ Tabs with TabButtonSection */}
        <TabButtonSection
          selectedValue={activeTab}
          options={ChatTabs}
          onChange={setActiveTab}
        />

        <View className="mt-2">
          {/* Activities */}
          <Text className="px-6 mb-2 font-poppins-regular text-base text-black">
            Messages
          </Text>

          {/* dummy chats */}
          <ChatProfileCard
            user={users[0]}
            timeLabel="2m"
            unreadCount={3}
            status="delivered"
            // Show text preview from you
            pinned
            fromMe
            messageType="text"
            lastMessage="Got your message — see you soon!"
            onPress={() => router.push(`/chat/${users[0].id}`)}
          />

          <ChatProfileCard
            user={users[1]}
            timeLabel="12m"
            muted
            unreadCount={0}
            status="read"
            // They are typing right now
            isTyping
            onPress={() => router.push(`/chat/${users[1].id}`)}
          />

          <ChatProfileCard
            user={users[2]}
            timeLabel="Yesterday"
            unreadCount={1}
            // Last item was a voice note
            messageType="voice"
            voiceDuration="0:12"
            onPress={() => router.push(`/chat/${users[2].id}`)}
          />

          <ChatProfileCard
            user={users[1]}
            timeLabel="12m"
            fromMe
            unreadCount={0}
            status="read"
            // They are typing right now
            messageType="text"
            lastMessage="Got your message — see you soon!"
            onPress={() => router.push(`/chat/${users[3].id}`)}
          />

          <ChatProfileCard
            user={users[3]}
            timeLabel="Mon"
            unreadCount={0}
            fromMe
            draftText="Bring a jacket…"
            onPress={() => router.push(`/chat/${users[4].id}`)}
          />

          <View style={{ height: 120 }} />
        </View>

        {/* Bottom Gap */}
        <View className="h-32 w-full" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
