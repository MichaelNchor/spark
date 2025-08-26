import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
  text,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isOutline = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      className={`rounded-full overflow-hidden ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {isOutline ? (
        // Outline Button
        <Text
          className={`text-primary font-poppins-medium text-lg text-center p-3 ${textStyles}`}
        >
          {text}
        </Text>
      ) : (
        // Gradient Button
        <LinearGradient
          colors={["#fd297b", "#ff5864", "#ff655b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-full justify-center items-center p-4"
        >
          <Text
            className={`text-white font-poppins-medium text-lg ${textStyles}`}
          >
            {text}
          </Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
