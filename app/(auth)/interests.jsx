import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from "../../assets/constants";
import MultiSelect from "../../components/MultiSelect";
import { router } from "expo-router";

const Interests = () => {
  const OPTIONS = [
    {
      id: "1",
      label: "Photography",
      value: "Photography",
      active: true,
      icon: "camera-outline",
    },
    {
      id: "2",
      label: "Shopping",
      value: "Shopping",
      active: false,
      icon: "checkmark-sharp",
    },
    {
      id: "3",
      label: "Karaoke",
      value: "Karaoke",
      active: true,
      icon: "checkmark-sharp",
    },
    {
      id: "4",
      label: "Yoga",
      value: "Yoga",
      active: false,
      icon: "checkmark-sharp",
    },
  ];

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
              options={OPTIONS}
              selectedOptions={selectedOptions}
              onChange={setSelectedOptions}
            />
          </View>

          <CustomButton
            title="Confirm"
            handlePress={() => router.push("/friends")}
            containerStyles="w-full h-[64px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Interests;
