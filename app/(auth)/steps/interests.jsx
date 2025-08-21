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
import icons from "../../../assets/constants"

const Interests = () => {

  const [selectedOptions, setSelectedOptions] = useState([]);

  // todo: implement logic to select and deselect active options
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingTop: 90,
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full gap-4">
          <View className="w-full flex-row items-center justify-between">
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

          <Text className="font-poppins-bold text-4xl text-left">
            Your Interests
          </Text>

          <Text className="font-poppins-regular text-gray-500">
            Select a few of your interests and let everyone know what you're
            passionate about.
          </Text>

          <View className="w-full flex-row">
            <MultiSelect
              options={InterestsOptions}
              selectedOptions={selectedOptions}
              onChange={setSelectedOptions}
            />
          </View>

          <CustomButton
            text="Confirm"
            handlePress={() => router.push("/steps/friends")}
            containerStyles="w-full h-[48px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Interests;
