import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import icons from "../assets/constants";

const SearchBox = ({
  value,
  placeholder = "Search Events",
  handleChangeText,
  onFilterPress,
  otherStyles = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row items-center w-full rounded-full px-3 ${otherStyles}`}
      style={{
        height: 56,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: isFocused ? "#fca5a5" : "#f0f0f0",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
      }}
    >
      {/* Search icon */}
      <Ionicons
        name="search"
        size={20}
        color="#9CA3AF"
        style={{ marginRight: 8 }}
      />

      {/* Input */}
      <TextInput
        className="flex-1 font-poppins-medium text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          color: "#111",
          paddingVertical: 0,
          height: "100%",
          includeFontPadding: false,
          ...(Platform.OS === "android" ? { textAlignVertical: "center" } : {}),
        }}
        {...props}
      />

      {/* Filter button (TouchableOpacity) */}
      <TouchableOpacity
        onPress={onFilterPress}
        activeOpacity={0.8}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          overflow: "hidden",
          marginLeft: 8,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
      >
        <LinearGradient
          colors={["#fd297b", "#ff5864", "#ff655b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={icons.filter}
            style={{ width: 16, height: 16, tintColor: "white" }}
            contentFit="cover"
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
