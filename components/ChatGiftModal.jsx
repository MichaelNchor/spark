import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { dummyGifts } from "../data/mockData";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width - 100) / 3;

const ChatGiftModal = ({ onSendGift }) => {
  const [selectedGift, setSelectedGift] = useState(null);

  return (
    <View className="bg-[#1c1c1e] rounded-t-2xl p-2 h-[350px]">
      {/* Gift Grid */}
      <FlatList
        data={dummyGifts}
        bounces={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedGift(item.id)}
            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
            className={`m-2 p-4 rounded-2xl items-center justify-center ${
              selectedGift === item.id ? "bg-[#E94057]" : "bg-[#2c2c2e]"
            }`}
          >
            <Text className="text-3xl">{item.icon}</Text>
            <Text className="text-white text-sm mt-2 font-poppins-medium">
              {item.name}
            </Text>
            <Text className="text-gray-400 text-xs font-poppins-medium">
              GH₵{item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Send button */}
      <TouchableOpacity
        disabled={!selectedGift}
        onPress={() => {
          // const gift = dummyGifts.find((g) => g.id === selectedGift);
          // onSendGift?.(gift);
          setSelectedGift(null);
        }}
        className={`mt-2 p-4 rounded-2xl items-center ${
          selectedGift ? "bg-[#E94057]" : "bg-gray-600"
        }`}
      >
        <Text className="text-white font-poppins-medium text-base">
          {selectedGift ? "Send Gift 🎉" : "Choose a Gift"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatGiftModal;
