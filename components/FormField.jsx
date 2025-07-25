import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-500 font-poppins-medium">
        {title}
      </Text>

      <View
        className={`w-full h-16 px-4 rounded-2xl border ${
          isFocused ? "border-primary" : "border-[#CCCCCC]"
        }`}
      >
        <TextInput
          className="flex-1 font-poppins-medium text-base h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
