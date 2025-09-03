import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ChatStatusCard = ({ user, isAdd = false }) => {
  if (isAdd) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ alignItems: "center", width: 64 }}
        onPress={() => console.log("Add story")}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#F3F4F6",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "#777777",
          }}
        >
          <Ionicons name="add" size={24} color="#111827" />
        </View>
        <Text className="font-poppins-regular text-base text-gray-700">
          Add
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ alignItems: "center", width: 64 }}>
      <LinearGradient
        colors={["#fd297b", "#ff5864", "#ff655b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 2, borderRadius: 999 }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: "hidden",
            backgroundColor: "#fff",
            borderColor: "white",
            borderWidth: 2
          }}
        >
          <Image
            source={{ uri: user?.media[0].uri }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        </View>
      </LinearGradient>
      <Text
        className="font-poppins-regular text-base text-gray-700"
        style={{
          maxWidth: 64,
        }}
      >
        {user?.name}
      </Text>
    </View>
  );
};

export default ChatStatusCard;
