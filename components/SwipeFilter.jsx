import { View, Text } from "react-native";
import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import MultiSelect from "./MultiSelect";
import { InterestsOptions } from "../data/mockData";

const SwipeFilter = () => {
  const [distance, setDistance] = useState([40]);
  const [ageRange, setAgeRange] = useState([20, 28]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <View className="m-4">

      {/* Location */}
      <View className="flex flex-row justify-between">
        <Text className="text-base font-poppins-medium text-black">Location</Text>
        <Text className="text-base font-poppins-regular text-black">
          Accra, Ghana
        </Text>
      </View>
      <View className="my-4">
        {/* //todo: write location component */}
      </View>

      {/* Distance */}
      <View className="flex flex-row justify-between">
        <Text className="text-base font-poppins-medium text-black">Distance</Text>
        <Text className="text-base font-poppins-regular text-black">
          {distance}km
        </Text>
      </View>
      <View className="my-4">
        <MultiSlider
          values={distance}
          sliderLength={320}
          min={1}
          max={100}
          step={1}
          onValuesChange={(values) => setDistance(values)}
          selectedStyle={{ backgroundColor: "#ff4d5a" }}
          unselectedStyle={{ backgroundColor: "#E0E0E0" }}
          markerStyle={{
            backgroundColor: "#ff4d5a",
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "white",
          }}
        />
      </View>

      {/* Age */}
      <View className="flex flex-row justify-between">
        <Text className="text-base font-poppins-medium text-black">Age</Text>
        <Text className="text-base font-poppins-regular text-black">
          {ageRange[0]}-{ageRange[1]}
          {"yrs"}
        </Text>
      </View>
      <View className="my-4">
        <MultiSlider
          values={ageRange}
          sliderLength={320}
          min={18}
          max={60}
          step={1}
          onValuesChange={setAgeRange}
          selectedStyle={{ backgroundColor: "#ff4d5a" }}
          unselectedStyle={{ backgroundColor: "#E0E0E0" }}
          markerStyle={{
            backgroundColor: "#ff4d5a",
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "white",
          }}
        />
      </View>

      {/* Interests */}
      <View className="flex">
        <Text className="text-base font-poppins-medium text-black">
          Interests
        </Text>
      </View>

      <View className="w-full flex-row my-4">
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
