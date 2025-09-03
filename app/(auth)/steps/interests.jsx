import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomButtonWithIcon from "../../../components/CustomButtonWithIcon";
import MultiSelect from "../../../components/MultiSelect";
import { router } from "expo-router";
import { InterestsOptions } from "../../../data/mockData";
import icons from "../../../assets/constants";
import { useStep } from "../../../state/StepContext";

const Interests = () => {
  const { setStep } = useStep();
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex-1 px-6 pt-6">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="w-full flex-row items-center justify-between mb-6">
            <CustomButtonWithIcon
              icon={icons.back}
              iconWidth={24}
              iconHeight={24}
              iconColor="#E94057"
              handlePress={() => router.back()}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />

            <TouchableOpacity
              className="px-4 py-2"
              onPress={() => router.push("/home")}
            >
              <Text className="text-primary text-base font-poppins-medium">
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text className="font-poppins-medium text-4xl mb-2">
            Your Interests
          </Text>

          <Text className="font-poppins-regular text-gray-500">
            {"Select a few of your interests and let everyone know what you're passionate about."}
          </Text>

          {/* MultiSelect */}
          <View className="w-full flex-row mt-6">
            <MultiSelect
              options={InterestsOptions}
              selectedOptions={selectedOptions}
              onChange={setSelectedOptions}
            />
          </View>
        </ScrollView>

        {/* Confirm Button (stuck at bottom) */}
        <View className="pb-12">
        <CustomButton
          text="Confirm"
          handlePress={() => {
            setStep(3);
            router.push("/steps/phonenumber");
          }}
          containerStyles="w-full h-[48px]"
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Interests;
