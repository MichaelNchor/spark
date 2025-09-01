import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButtonWithIcon = ({
  text,
  icon,
  iconColor,
  iconWidth = 34,
  iconHeight = 34,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isOutline = false,
  iconStyles = "",
}) => {
  const onlyIcon = !text;

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
        // ⬇️ Make the wrapper fill the container and center contents
        <View
          className="flex-row items-center justify-center rounded-full"
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            source={icon}
            style={{
              width: iconWidth,
              height: iconHeight,
              tintColor: iconColor,
            }}
            className={`${onlyIcon ? "" : "mr-2"} ${iconStyles}`}
          />
          {!!text && (
            <Text
              className={`text-primary font-poppins-bold text-lg ${textStyles}`}
            >
              {text}
            </Text>
          )}
        </View>
      ) : (
        <LinearGradient
          colors={["#fd297b", "#ff5864", "#ff655b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          // ⬇️ Fill parent so the icon is centered inside fixed-size circles
          style={{ width: "100%", height: "100%", borderRadius: 9999 }}
        >
          <View className="flex-row items-center justify-center w-full h-full">
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
                  className={`${onlyIcon ? "" : "mr-2"} ${iconStyles}`}
                />
                {!!text && (
                  <Text
                    className={`text-white font-poppins-bold text-lg ${textStyles}`}
                  >
                    {text}
                  </Text>
                )}
              </>
            )}
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default CustomButtonWithIcon;
