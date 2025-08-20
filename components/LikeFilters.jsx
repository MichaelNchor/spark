import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import CustomButtonWithIcon from "./CustomButtonWithIcon";
import icons from "../assets/constants";
import { LikeFilterOptions } from "../data/mockData";

const LikeFilters = ({
  onOpenModal,
  onFilterChange,
  isLoading,
  selectedValue,
}) => {
  return (
    <View className="mt-6 mb-4 flex-row mx-4 items-center">
      {/* Filter icon button */}
      {/* <CustomButtonWithIcon
        icon={icons.filter}
        iconWidth={24}
        iconHeight={24}
        iconColor="white"
        handlePress={() => onOpenModal(true)}
        containerStyles="w-12 h-12 items-start"
        isOutline={false}
      /> */}

      {/* Divider */}
      {/* <View
        style={{
          width: 1,
          backgroundColor: "#777777",
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      /> */}

      {/* Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {LikeFilterOptions.map((option) => {
          const active = selectedValue === option.value;

          return (
            <TouchableOpacity
              key={option.id}
              className={`${active ? "bg-primary" : "bg-transparent"} border w-auto justify-center h-12 p-2 flex-row rounded-2xl items-center ${isLoading ? "opacity-50" : ""}`}
              onPress={() => {
                onFilterChange(option.value);
              }}
              activeOpacity={1}
              disabled={isLoading}
              style={{
                borderWidth: 1,
                borderColor: active ? "#E94057" : "#cccccc",
              }}
            >
              <Text
                className={`px-2 font-poppins-semibold text-xs ${active ? "text-white" : "text-gray-500"}`}
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

export default LikeFilters;
