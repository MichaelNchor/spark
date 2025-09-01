import React from "react";
import { View } from "react-native";
import CustomButton from "./CustomButton";

const FilterFooter = ({ onReset, onApply, applying = false }) => {
  return (
    <View className="flex-row gap-3">
      <CustomButton
        text="Reset"
        isOutline
        handlePress={onReset}
        containerStyles="flex-1 h-12 border border-gray-200 bg-white"
        textStyles="text-base"
      />
      <CustomButton
        text="Apply"
        handlePress={onApply}
        isLoading={applying}
        containerStyles="flex-1 h-12"
        textStyles="text-base"
      />
    </View>
  );
};

export default FilterFooter;
