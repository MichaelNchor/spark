import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../assets/constants";

const BRAND_GRADIENT = ["#fd297b", "#ff5864", "#ff655b"];

const ChatBoxField = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  onGiftPress,
  isDarkMode = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Theme tokens
  const bg = isDarkMode ? "#111827" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#0F172A";
  const borderIdle = isDarkMode ? "#374151" : "#E5E7EB";
  const borderFocus = "#E94057";
  const placeholderColor = isDarkMode ? "#9CA3AF" : "#6B7280";

  return (
    <View className={`space-y-2 ${otherStyles ?? ""}`}>
      <View
        className="flex-row w-full justify-center items-center h-12 px-2 rounded-full border"
        style={{
          backgroundColor: bg,
          borderColor: isFocused ? borderFocus : borderIdle,
          // subtle lift on focus
          shadowColor: "#000",
          shadowOpacity: isFocused ? 0.08 : 0,
          shadowRadius: isFocused ? 8 : 0,
          shadowOffset: { width: 0, height: isFocused ? 4 : 0 },
          elevation: isFocused ? 2 : 0,
        }}
      >
        <TextInput
          className="flex-1 font-poppins-regular text-base h-full py-2"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: textColor }}
          returnKeyType="send"
          {...props}
        />

        {/* Gift button (compact gradient pill) */}
        <TouchableOpacity
          onPress={onGiftPress}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ marginLeft: 6 }}
        >
          <LinearGradient
            colors={BRAND_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.gift}
              style={{ width: 16, height: 16, tintColor: "#fff" }}
              contentFit="contain"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxField;
