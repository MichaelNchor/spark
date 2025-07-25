import { router } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import icons from "../../assets/constants";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import VerificationInput from "../../components/VerificationInput";

const VerifyCode = () => {
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
          <CustomButtonWithIcon
            icon={icons.back}
            iconWidth={24}
            iconHeight={24}
            iconColor="#E94057"
            handlePress={() => router.back()}
            containerStyles="w-[50px] h-[50px] items-start"
            isOutline={true}
          />

          <Text className="font-poppins-bold text-4xl mb-4 text-center">
            00:42
          </Text>
          <Text className="font-poppins-regular text-gray-500 mb-8 text-center">
            Type the verification code we've sent you.
          </Text>

          <View className="w-full flex-row">
            <VerificationInput />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyCode;
