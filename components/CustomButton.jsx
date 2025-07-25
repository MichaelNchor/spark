import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isOutline = false,
}) => {
  return (
    <TouchableOpacity
      className={`${isOutline ? "border border-primary bg-transparent" : "bg-primary"} rounded-2xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={
        isOutline
          ? {
              borderWidth: 1,
              borderColor: "#CCCCCC",
            }
          : {}
      }
    >
      <Text
        className={`${isOutline ? "text-primary" : "text-white"}  font-poppins-bold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
