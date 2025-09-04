// TabButtonSection.js
import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SPARK_GRADIENT = ["#fd297b", "#ff5864", "#ff655b"];

const Chip = ({ active, label, icon, onPress, disabled }) => {
  const baseHeight = 40;

  const Inactive = () => (
    <View
      style={{
        height: baseHeight,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color="#E94057"
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 14,
          color: "#6B7280",
        }}
      >
        {label}
      </Text>
    </View>
  );

  const Active = () => (
    <LinearGradient
      colors={SPARK_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: baseHeight,
        paddingHorizontal: 16,
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color="#fff"
          style={{ marginRight: 6 }}
        />
      )}
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 14,
          color: "#FFFFFF",
        }}
      >
        {label}
      </Text>
    </LinearGradient>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      {active ? <Active /> : <Inactive />}
    </TouchableOpacity>
  );
};

const TabButtonSection = ({
  options = [],
  selectedValue,
  onChange,
  isLoading = false,
  containerClassName = "mt-2",
}) => {
  return (
    <View
      className={`w-full ${containerClassName}`}
      style={{ minHeight: 56 }} // 👈 give vertical breathing room
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 8, // 👈 add vertical padding so pills aren’t cut off
          gap: 10,
          alignItems: "center",
        }}
      >
        {options.map((opt) => (
          <Chip
            key={opt.id}
            active={selectedValue === opt.value}
            label={opt.label}
            icon={opt.icon}
            onPress={() => onChange(opt.value)}
            disabled={isLoading}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TabButtonSection;
