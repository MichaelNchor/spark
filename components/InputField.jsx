import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const InputField = ({
  text,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  isDarkMode = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="absolute top-1 left-4 text-xs text-gray-400 font-poppins-medium z-10">
        {text}
      </Text>

      <View
        className={`w-full h-12 px-2 rounded-full border ${
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
      </View>
    </View>
  );
};

export default InputField;
