import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const RadioSelect = ({ options, isLoading, checkedValue, onChange }) => {
  return (
    <View className="w-full">
      {options.map((option) => {
        let active = checkedValue === option.value;

        const ButtonContent = (
          <View
            className={`w-full h-[48px] flex-row justify-between items-center rounded-full px-4 ${
              active ? "" : "bg-white"
            }`}
          >
            <Text
              className={`font-poppins-medium text-lg ${
                active ? "text-white" : "text-gray-500"
              }`}
            >
              {option.label}
            </Text>

            {active && (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
          </View>
        );

        return (
          <TouchableOpacity
            key={option.id}
            className={`w-full mt-2 rounded-full overflow-hidden ${
              isLoading ? "opacity-50" : ""
            }`}
            onPress={() => onChange(option.value)}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {active ? (
              <LinearGradient
                colors={["#fd297b", "#ff5864", "#ff655b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 999 }}
              >
                {ButtonContent}
              </LinearGradient>
            ) : (
              <View
                className="border border-gray-300 rounded-full"
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

export default RadioSelect;
