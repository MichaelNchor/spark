import React, { memo, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = memo(
  ({
    text,
    handlePress,
    containerStyles = "",
    textStyles = "",
    isLoading,
    isOutline = false,
  }) => {
    const onPress = useCallback(() => {
      if (!isLoading && handlePress) handlePress();
    }, [isLoading, handlePress]);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={isLoading}
        // ✅ Force full width regardless of parent alignment
        style={{ width: "100%", alignSelf: "stretch" }}
        className={`w-full h-12 rounded-full overflow-hidden ${containerStyles} ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {isOutline ? (
          <View className="flex-1 flex-row items-center justify-center">
            <Text className={`text-primary font-poppins-medium text-base ${textStyles}`}>
              {text}
            </Text>
          </View>
        ) : (
          <LinearGradient
            colors={["#fd297b", "#ff5864", "#ff655b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            // ✅ Use style for sizing to avoid className issues on non-core components
            style={{ flex: 1, borderRadius: 9999, alignItems: "center", justifyContent: "center" }}
          >
            <Text className={`text-white font-poppins-medium text-base ${textStyles}`}>
              {text}
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    );
  }
);

CustomButton.displayName = "CustomButton";
export default CustomButton;
