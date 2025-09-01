import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BRAND = ["#fd297b", "#ff5864", "#ff655b"];
const toOpt = (o) => (typeof o === "string" ? { label: o, value: o } : o);

const SimpleRadioSelect = ({ options = [], value, onChange }) => {
  const normalized = options.map(toOpt);

  return (
    <View className="flex-row flex-wrap gap-[10px] overflow-visible py-0.5">
      {normalized.map((opt) => {
        const active = opt.value === value;

        if (active) {
          return (
            <TouchableOpacity
              key={opt.value}
              activeOpacity={0.9}
              onPress={() => onChange?.(opt.value)}
              className="rounded-full overflow-visible"
              accessibilityRole="button"
              accessibilityState={{ selected: true }}
              accessibilityLabel={opt.label}
            >
              {/* wrapper handles rounded/overflow; gradient just fills */}
              <View className="rounded-full overflow-hidden">
                <LinearGradient
                  colors={BRAND}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  // only padding via style since gradient doesn't accept className
                  style={{
                    paddingHorizontal: 14,
                    minHeight: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                  }}
                >
                  <Text className="text-white text-[14px] leading-[18px] font-poppins-regular">
                    {opt.label}
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={opt.value}
            activeOpacity={0.9}
            onPress={() => onChange?.(opt.value)}
            className="bg-white border border-[#E5E7EB] rounded-full overflow-visible"
            accessibilityRole="button"
            accessibilityState={{ selected: false }}
            accessibilityLabel={opt.label}
          >
            <View className="px-[14px] min-h-[36px] rounded-full items-center justify-center">
              <Text className="text-[#111827] text-[14px] leading-[18px] font-poppins-regular">
                {opt.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SimpleRadioSelect;
