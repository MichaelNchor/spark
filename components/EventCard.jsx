import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";

const EventCard = ({ event }) => {
  const members = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/36.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
  ];
  // Show max 3 avatars
  const visibleMembers = members.slice(0, 3);
  const extraCount = members.length - visibleMembers.length;

  return (
    <View className="mx-4 mb-4 rounded-3xl bg-[#1c1c1e] shadow-lg overflow-hidden flex-row">
      {/* Left: Event Image */}
      <Image
        source={
          typeof event.image === "string" ? { uri: event.image } : event.image
        }
        style={{ width: 145, height: "100%" }}
        className="rounded-l-3xl"
        contentFit="cover"
      />

      {/* Right: Event Info */}
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text
            className="text-white text-lg font-poppins-medium"
            numberOfLines={1}
          >
            {event.title}
          </Text>

          <Text className="text-gray-400 text-sm mt-1 font-poppins-regular">
            {event.members} Members •
            <Text className="text-green-400 font-poppins-regular">
              {" "}
              {event.spotsLeft} Spots left
            </Text>
          </Text>

          <Text className="text-gray-400 text-sm mt-1 font-poppins-regular">
            {event.date} • {event.time}
          </Text>

          <View className="flex-row items-center mt-1">
            <Image
              source={icons.location}
              style={{ width: 12, height: 12, tintColor: "white" }}
              contentFit="contain"
            />
            <Text className="text-gray-400 text-sm font-poppins-regular ml-1">
              {event.location}
            </Text>
          </View>

          <Text className="text-gray-400 text-sm mt-1 font-poppins-medium">
            Host:{" "}
            <Text className="text-white font-poppins-medium">{event.host}</Text>
          </Text>
        </View>

        {/* Footer */}
        <View className="flex-row justify-between items-center mt-3">
          {/* ✅ Avatars + extra count + plus button */}
          <View className="flex-row items-center">
            {visibleMembers.map((uri, index) => (
              <View
                key={index}
                className="w-8 h-8 rounded-full border-2 border-[#1c1c1e] overflow-hidden"
                style={{ marginLeft: index === 0 ? 0 : -10 }}
              >
                <Image
                  source={{ uri }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ))}

            {extraCount > 0 && (
              <View
                className="w-8 h-8 rounded-full bg-gray-600 justify-center items-center border-2 border-[#1c1c1e]"
                style={{ marginLeft: -10, marginRight: 5 }}
              >
                <Text className="text-white text-xs font-poppins-semibold">
                  +{extraCount}
                </Text>
              </View>
            )}
          </View>

          {/* Add button separated */}
          <TouchableOpacity className="w-8 h-8 rounded-full bg-[#E94057] justify-center items-center border-2 border-[#1c1c1e]">
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
