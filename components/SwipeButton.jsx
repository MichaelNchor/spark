import React from "react";
import { Image, TouchableOpacity, Text } from "react-native";

const SwipeButton = ({
  icon,
  iconColor,
  iconWidth = 34,
  iconHeight = 34,
  handlePress,
  isLoading,
  iconStyles,
  containerStyles,
}) => {
  return (
    <TouchableOpacity
      className={`px-3 py-2 rounded-full mr-2 mb-2 items-center justify-center flex-row ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={{
        backgroundColor: "rgba(128,128,128,0.6)",
        borderWidth: 0,
      }}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
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
    </TouchableOpacity>
  );
};

export default SwipeButton;
