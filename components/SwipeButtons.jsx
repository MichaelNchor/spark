import React from "react";
import { Image, TouchableOpacity } from "react-native";

const SwipeButtons = ({
  icon,
  iconColor,
  iconWidth = 34,
  iconHeight = 34,
  handlePress,
  isLoading,
  iconStyles,
  containerStyles
}) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center bg-[#121212] rounded-full border-[1px] border-[#777777] flex-row ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Image
        source={icon}
        style={{
          width: iconWidth,
          height: iconHeight,
        }}
        className={iconStyles}
      />
    </TouchableOpacity>
  );
};

export default SwipeButtons;
