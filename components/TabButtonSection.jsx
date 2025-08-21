// TabButtonSection.js
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";

const TabButtonSection = ({
  options = [], // expects [{id, label, value, icon}]
  selectedValue,
  onChange,
  isLoading = false,
  containerClassName = "mt-6 mb-4 mx-4", // customizable wrapper styles
}) => {
  return (
    <View className={`flex-row items-center ${containerClassName}`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        {options.map((option) => {
          const active = selectedValue === option.value;

          return (
            <TouchableOpacity
              key={option.id}
              className={`${active ? "bg-primary" : "bg-transparent"} border w-auto justify-center h-10 px-3 flex-row rounded-full items-center ${
                isLoading ? "opacity-50" : ""
              }`}
              onPress={() => onChange(option.value)}
              activeOpacity={0.9}
              disabled={isLoading}
              style={{
                borderWidth: 1,
                borderColor: active ? "#E94057" : "#cccccc",
              }}
            >
              {option.icon && (
                <Ionicons
                  name={option.icon}
                  size={18}
                  color={active ? "#ffffff" : "#E94057"}
                  className="pr-2"
                />
              )}
              <Text
                className={`font-poppins-regular text-base ${
                  active ? "text-white" : "text-[#cccccc]"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabButtonSection;
