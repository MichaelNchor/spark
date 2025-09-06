import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

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
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      className={`rounded-full overflow-hidden ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={{ borderRadius: 999 }}
    >
      {/* Glass / blur effect */}
      <BlurView
        intensity={55} // controls strength of blur
        tint="dark" // can be "light" | "dark" | "default"
        style={{
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 999,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.40)",
        }}
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
      </BlurView>
    </TouchableOpacity>
  );
};

export default SwipeButton;
