import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MultiSelect = ({ options, isLoading, selectedOptions, onChange }) => {
  return (
    <View className="w-full flex-row flex-wrap gap-3">
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option.id}
            className={`${option.active ? "bg-primary shadow-lg shadow-primary" : "border-gray-300"} border py-2 px-3 flex-row rounded-full items-center ${isLoading ? "opacity-50" : ""}`}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
            disabled={isLoading}
            style={{
              borderWidth: 1,
              borderColor: option.active ? "#E94057" : "#ddd",
            }}
          >
            <Ionicons
              name={option.icon}
              size={18}
              color={option.active ? "#ffffff" : "#E94057"}
            />
            <Text
              className={`ml-2 font-poppins-regular text-base ${option.active ? "text-white" : "text-gray-500"}`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MultiSelect;
