import { View, Text, TouchableOpacity } from "react-native";
import React, { act } from "react";
import { Ionicons } from "@expo/vector-icons";

const RadioSelect = ({ options, isLoading, checkedValue, onChange }) => {
  return (
    <View className="w-full">
      {options.map((option) => {
        let active = checkedValue == option.value;
        return (
          <TouchableOpacity
            key={option.id}
            className={`${active ? 'bg-primary': 'border-gray-300'} border w-full justify-between h-[48px] mt-2 flex-row rounded-full items-center ${isLoading ? "opacity-50" : ""}`}
            onPress={() => {
              onChange(option.value);
            }}
            activeOpacity={0.7}
            disabled={isLoading}
            style={
              active
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
            <Text
              className={`mx-4 font-poppins-medium text-lg ${active ? "text-white" : "text-gray-500"}`}
            >
              {option.label}
            </Text>
            <Ionicons
              className="mx-4"
              name={option.icon}
              size={20}
              color={active ? "#ffffff" : "#d1d5db"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioSelect;
