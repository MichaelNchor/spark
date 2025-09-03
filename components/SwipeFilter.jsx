import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import MultiSelect from "./MultiSelect";
import { InterestsOptions } from "../data/mockData";
import { Ionicons } from "@expo/vector-icons";
import SimpleRadioSelect from "./SimpleRadioSelect";

const BRAND = ["#fd297b", "#ff5864", "#ff655b"];

export const DEFAULT_FILTERS = {
  location: "New York, USA",
  gender: "Women",
  sortBy: "Online",
  distance: [15],
  ageRange: [20, 28],
  interests: [],
};

const SwipeFilter = ({ value, onChange }) => {
  const width = Dimensions.get("window").width;
  const sliderLength = Math.max(240, width - 56);

  // use controlled values if provided, else fall back to defaults
  const [location, setLocation] = useState(value?.location ?? DEFAULT_FILTERS.location);
  const [gender, setGender] = useState(value?.gender ?? DEFAULT_FILTERS.gender);
  const [sortBy, setSortBy] = useState(value?.sortBy ?? DEFAULT_FILTERS.sortBy);
  const [distance, setDistance] = useState(value?.distance ?? DEFAULT_FILTERS.distance);
  const [ageRange, setAgeRange] = useState(value?.ageRange ?? DEFAULT_FILTERS.ageRange);
  const [selectedOptions, setSelectedOptions] = useState(
    value?.interests ?? DEFAULT_FILTERS.interests
  );

  // emit to parent whenever something changes (if onChange provided)
  useEffect(() => {
    onChange?.({
      location,
      gender,
      sortBy,
      distance,
      ageRange,
      interests: selectedOptions,
    });
  }, [location, gender, sortBy, distance, ageRange, selectedOptions, onChange]);

  const distTicks = useMemo(() => [0, 5, 10, 15, 20, 25], []);
  const ageTicks = useMemo(() => [18, 28, 38, 48, 58], []);

  return (
    <View className="mx-1">
      {/* Location */}
      <Text className="text-base font-poppins-medium text-black">Location</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="mt-2 mb-4 flex-row items-center justify-between px-4 h-11 rounded-xl bg-[#F3F4F6]"
        onPress={() => {}}
      >
        <Text className="font-poppins-regular text-gray-600">
          {location}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Interested In */}
      <Text className="text-base font-poppins-medium text-black">
        Interested In
      </Text>
      <View className="mt-3 mb-6">
        <SimpleRadioSelect
          options={["Women", "Men", "Both"]}
          value={gender}
          onChange={setGender}
        />
      </View>

      {/* Sort by */}
      <Text className="text-base font-poppins-medium text-black">Sort by</Text>
      <View className="mt-3 mb-6">
        <SimpleRadioSelect
          options={[
            { label: "Online", value: "Online" },
            { label: "Popular", value: "Popular" },
            { label: "Highly Match", value: "Highly Match" },
          ]}
          value={sortBy}
          onChange={setSortBy}
        />
      </View>

      {/* Distance */}
      <View className="flex flex-row justify-between items-end">
        <Text className="text-base font-poppins-medium text-black">
          Distance
        </Text>
        <Text className="text-sm font-poppins-regular text-gray-600">
          {distance[0]} km
        </Text>
      </View>

      <View className="mt-3">
        <MultiSlider
          values={distance}
          sliderLength={sliderLength}
          min={0}
          max={25}
          step={1}
          onValuesChange={(v) => setDistance(v)}
          selectedStyle={{ backgroundColor: BRAND[1] }}
          unselectedStyle={{ backgroundColor: "#E5E7EB" }}
          containerStyle={{ height: 40 }}
          trackStyle={{ height: 4, borderRadius: 999 }}
          markerStyle={{
            backgroundColor: BRAND[1],
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "white",
          }}
        />

        <View className="flex-row justify-between mt-2 px-1">
          {distTicks.map((t) => (
            <Text
              key={`d-${t}`}
              className="text-[11px] text-gray-400 font-poppins-regular"
            >
              {t} Km
            </Text>
          ))}
        </View>
      </View>

      {/* Age */}
      <View className="flex flex-row justify-between items-end mt-6">
        <Text className="text-base font-poppins-medium text-black">Age</Text>
        <Text className="text-sm font-poppins-regular text-gray-600">
          {ageRange[0]}–{ageRange[1]}
        </Text>
      </View>

      <View className="mt-3">
        <MultiSlider
          values={ageRange}
          sliderLength={sliderLength}
          min={18}
          max={60}
          step={1}
          onValuesChange={(v) => setAgeRange(v)}
          selectedStyle={{ backgroundColor: BRAND[1] }}
          unselectedStyle={{ backgroundColor: "#E5E7EB" }}
          containerStyle={{ height: 40 }}
          trackStyle={{ height: 4, borderRadius: 999 }}
          markerStyle={{
            backgroundColor: BRAND[1],
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "white",
          }}
        />

        <View className="flex-row justify-between mt-2 px-1">
          {ageTicks.map((t) => (
            <Text
              key={`a-${t}`}
              className="text-[11px] text-gray-400 font-poppins-regular"
            >
              {t}
            </Text>
          ))}
        </View>
      </View>

      {/* Interests */}
      <Text className="text-base font-poppins-medium text-black mt-6">
        Interests
      </Text>
      <View className="w-full flex-row mt-3 mb-2">
        <MultiSelect
          options={InterestsOptions}
          selectedOptions={selectedOptions}
          onChange={setSelectedOptions}
        />
      </View>
    </View>
  );
};

export default SwipeFilter;
