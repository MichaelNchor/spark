import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import icons from "../../../assets/constants";
import CustomButtonWithIcon from "../../../components/CustomButtonWithIcon";
import VerificationInput from "../../../components/VerificationInput";
import { useStep } from "../../../state/StepContext";

const VerifyCode = () => {
  const { setStep } = useStep();
  const [verifyCode, setVerifyCode] = useState("");

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingTop: 20,
          paddingHorizontal: 10,
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

          <Text className="font-poppins-medium text-4xl mb-2 text-center">
            00:42
          </Text>
          <Text className="font-poppins-regular text-gray-500 mb-8 text-center">
            {"Type the verification code we've sent you."}
          </Text>

          <View
            className="w-full flex-row"
            style={{
              paddingHorizontal: 20,
            }}
          >
            <VerificationInput
              onComplete={(code) => {
                setStep(5);
                setVerifyCode(code);
                router.push("/steps/profile-details");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyCode;
