import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const MultiSelect = ({ options, isLoading, selectedOptions, onChange }) => {
  return (
    <View className="w-full flex-row flex-wrap justify-between">
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option.id}
            className={`${option.active ? "bg-primary shadow-lg shadow-primary" : "border-gray-300"} border w-[48%] justify-start h-[48px] my-2 flex-row rounded-2xl items-center ${isLoading ? "opacity-50" : ""}`}
            onPress={() => {
              onChange(option.value);
            }}
            activeOpacity={0.7}
            disabled={isLoading}
            style={
              option.active
                ? {
                    borderWidth: 1,
                    borderColor: "#E94057",
                  }
                : {
                    borderWidth: 1,
                    borderColor: "#cccccc",
                  }
            }
          >
            <Ionicons
              className="mx-4"
              name={option.icon}
              size={20}
              color={option.active ? "#ffffff" : "#E94057"}
            />
            <Text
              className={`mr-4 font-poppins-medium text-base ${option.active ? "text-white" : "text-gray-500"}`}
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
