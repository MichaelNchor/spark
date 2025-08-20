import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import CustomButtonWithIcon from "./CustomButtonWithIcon";
import icons from "../assets/constants";
import { Image } from "expo-image";

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

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className={`flex-row w-full justify-center items-center h-12 px-2 rounded-2xl border ${
          isFocused ? "border-primary" : "border-[#cccccc]"
        }`}
      >
        <TextInput
          className="flex-1 font-poppins-medium text-base h-full py-2"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: isDarkMode ? "white" : "black" }}
          {...props}
        />

        <TouchableOpacity onPress={onGiftPress}>
          {/* Icon with fixed size */}
          <Image
            source={icons.gift}
            style={{
              width: 24,
              height: 24,
              margin: 7,
            }}
            className="items-center justify-center"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBoxField;
