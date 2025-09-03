import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MainSwipeButton = ({
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
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
      className={`rounded-full overflow-hidden ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <LinearGradient
        colors={["#fd297b", "#ff5864", "#ff655b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 justify-center items-center rounded-full"
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
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MainSwipeButton;
