import React, { use, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from "../../assets/constants";
import { router } from "expo-router";
import RadioSelect from "../../components/RadioSelect";
import CustomButton from "../../components/CustomButton";

const Gender = () => {
  const OPTIONS = [
    { id: "1", label: "Female", value: "Female", icon: "checkmark-sharp" },
    { id: "2", label: "Male", value: "Male", icon: "checkmark-sharp" }
  ];

  const [gender, setGender] = useState("Female");

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

          <Text className="font-poppins-bold text-4xl mb-4 text-left">
            I am a
          </Text>

          <View className="w-full flex-row">
            <RadioSelect
              options={OPTIONS}
              checkedValue={gender}
              onChange={setGender}
            />
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/interests")}
            containerStyles="w-full h-[64px] mt-96"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gender;
