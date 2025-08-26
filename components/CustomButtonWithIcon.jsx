import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  backgroundColor,
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
        <View className="flex-row justify-center items-center p-4 rounded-full">
          <Image
            source={icon}
            style={{
              width: iconWidth,
              height: iconHeight,
              tintColor: iconColor,
            }}
            className={`mr-2 ${iconStyles}`}
          />
          {text && (
            <Text
              className={`text-primary font-poppins-bold text-lg ${textStyles}`}
            >
              {text}
            </Text>
          )}
        </View>
      ) : (
        <LinearGradient
          colors={["#fd297b", "#ff5864", "#ff655b"]} // Tinder gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-full flex-row justify-center items-center p-4"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Image
                source={icon}
                style={{
                  width: iconWidth,
                  height: iconHeight,
                  tintColor: iconColor,
                }}
                className={`mr-2 ${iconStyles}`}
              />
              {text && (
                <Text
                  className={`text-white font-poppins-bold text-lg ${textStyles}`}
                >
                  {text}
                </Text>
              )}
            </>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default CustomButtonWithIcon;
