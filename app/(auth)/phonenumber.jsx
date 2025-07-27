import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const PhoneNumber = () => {
  const [form, setPhoneNumber] = useState({
    PhoneNumber: "",
  });

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingTop: 160,
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full gap-4">
          <Text className="font-poppins-bold text-4xl mb-4">My mobile</Text>
          <Text className="font-poppins-regular text-gray-500">
            Please enter your valid phone number. We will send you a 4-digit
            code to verify your account.
          </Text>

          <View className="w-full mb-12">
            <FormField
              title=""
              value={form.PhoneNumber}
              handleChangeText={(e) =>
                setPhoneNumber({ ...form, PhoneNumber: e })
              }
              otherStyles=""
              keyboardType="phone-pad"
            />
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/verify-code")}
            containerStyles="w-full h-[64px] mt-96"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumber;
