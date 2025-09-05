import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import { useStep } from "../../../state/StepContext";

const PhoneNumber = () => {
  const { setStep } = useStep();
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleContinue = () => {
    if (!isValid) return;
    setStep(4);
    router.push({
      pathname: "/steps/verify-code",
      params: { phone },
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 60,
          paddingHorizontal: 30,
          justifyContent: "space-between",
          paddingBottom: 48,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Content */}
        <View className="w-full gap-4">
          <Text className="font-poppins-medium text-4xl mb-2">My mobile</Text>

          <Text className="font-poppins-regular text-gray-500">
            Please enter your valid phone number. We’ll send you a 4-digit code
            to verify your account.
          </Text>

          <View className="w-full mt-2">
            <PhoneNumberInput
              value={phone}
              onChange={setPhone}
              onValidityChange={setIsValid}
              locked
              minDigits={9}
            />
            <Text className="mt-2 text-xs text-gray-500 font-poppins-regular">
              We’ll text a code to{" "}
              <Text className="text-gray-700 font-poppins-medium">{phone}</Text>
            </Text>
          </View>
        </View>

        {/* Bottom button */}
        <View className="w-full">
          <CustomButton
            text="Continue"
            handlePress={handleContinue}
            containerStyles={`w-full h-[48px] ${!isValid ? "opacity-50" : ""}`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumber;
