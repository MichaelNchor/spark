import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MultiSelect = ({
  options,
  isLoading,
  selectedOptions = [],
  onChange,
}) => {
  // Handle toggle
  const handlePress = (value) => {
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter((v) => v !== value)); // remove
    } else {
      onChange([...selectedOptions, value]); // add
    }
  };

  return (
    <View className="w-full flex-row flex-wrap gap-3">
      {options.map((option) => {
        const active = selectedOptions.includes(option.value);

        const ButtonContent = (
          <View className="flex-row items-center justify-center px-4 py-2">
            <Ionicons
              name={option.icon}
              size={18}
              color={active ? "#fff" : "#E94057"}
            />
            <Text
              className={`ml-2 font-poppins-regular text-base ${
                active ? "text-white" : "text-gray-600"
              }`}
            >
              {option.label}
            </Text>
          </View>
        );

        return (
          <TouchableOpacity
            key={option.id}
            className={`rounded-full overflow-hidden ${
              isLoading ? "opacity-50" : ""
            }`}
            onPress={() => handlePress(option.value)}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {active ? (
              <LinearGradient
                colors={["#fd297b", "#ff5864", "#ff655b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 999,
                }}
              >
                {ButtonContent}
              </LinearGradient>
            ) : (
              <View
                className="bg-white border border-gray-300 rounded-full"
                style={{ borderRadius: 999 }}
              >
                {ButtonContent}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MultiSelect;
