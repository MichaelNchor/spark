import React from "react";
import { View, Pressable, Dimensions } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import CustomButton from "./CustomButton";

const { height } = Dimensions.get("window");

const BottomSheetModal = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      className="absolute inset-0 justify-end"
    >
      <BlurView intensity={50} tint="dark" className="absolute inset-0">
        <Pressable className="flex-1" onPress={onClose} />
      </BlurView>

      <View
        style={{ height: height * 0.6 }}
        className="bg-white rounded-t-3xl p-4 px-8"
      >
        {children}
        <Pressable onPress={onClose}>
        <CustomButton
            title="Save"
            handlePress={onClose}
            containerStyles="w-full h-[64px] mt-14"
          />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default BottomSheetModal;
