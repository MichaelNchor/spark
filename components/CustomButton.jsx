import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = memo(({
  text,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading,
  isOutline = false,
}) => {
  const onPress = useCallback(() => {
    if (!isLoading && handlePress) {
      handlePress();
    }
  }, [isLoading, handlePress]);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isLoading}
      className={`h-12 rounded-full overflow-hidden ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {isOutline ? (
        <View className="flex-1 flex-row items-center justify-center">
          <Text
            className={`text-primary font-poppins-medium text-lg ${textStyles}`}
          >
            {text}
          </Text>
        </View>
      ) : (
        <LinearGradient
          colors={["#fd297b", "#ff5864", "#ff655b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 flex-row items-center justify-center rounded-full"
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
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
