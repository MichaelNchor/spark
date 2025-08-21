import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const CustomButtonWithIcon = ({
  text,
  icon,
  iconColor = "#fff",
  iconWidth = 34,
  iconHeight = 34,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isOutline = false,
  iconStyles = "",
  backgroundColor
}) => {
  return (
    <TouchableOpacity
      className={`${isOutline ? `border border-${backgroundColor ?? "primary"} bg-transparent` : `bg-${backgroundColor ?? "primary"}`} rounded-full flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={
        isOutline
          ? {
              borderWidth: 0,
              borderColor: "#cccccc",
            }
          : {}
      }
    >
      <Image
        source={icon}
        style={{
          width: iconWidth,
          height: iconHeight,
          tintColor: iconColor,
        }}
        className={iconStyles}
      />

      {text != null && (
        <Text
          className={`${isOutline ? "text-primary" : "text-white"} font-poppins-bold text-lg ${textStyles}`}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButtonWithIcon;
