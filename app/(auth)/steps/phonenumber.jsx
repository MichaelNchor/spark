import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import { useStep } from "../../../state/StepContext";

const PhoneNumber = () => {
  const { setStep } = useStep();
  const [form, setPhoneNumber] = useState({
    PhoneNumber: "",
  });

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 60,
          paddingHorizontal: 30,
          justifyContent: "space-between",
          paddingBottom: 48, // same as pb-12
        }}
      >
        {/* Content */}
        <View className="w-full gap-4">
          <Text className="font-poppins-medium text-4xl mb-2">My mobile</Text>

          <Text className="font-poppins-regular text-gray-500">
            Please enter your valid phone number. We will send you a 4-digit
            code to verify your account.
          </Text>

          <View className="w-full">
            <InputField
              value={form.PhoneNumber}
              handleChangeText={(e) => {
                setPhoneNumber({ ...form, PhoneNumber: e });
              }}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Fixed bottom button */}
        <View className="w-full">
          <CustomButton
            text="Continue"
            handlePress={() => {
              setStep(4);
              router.push("/steps/verify-code");
            }}
            containerStyles="w-full h-[48px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumber;
