import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import { useStep } from "../../../state/StepContext";

const isValidEmail = (raw) => {
  const email = raw.trim().toLowerCase();

  // quick guards
  if (!email || email.length > 254) return false;
  if (!email.includes("@")) return false;

  // simple, reliable pattern (keeps it practical for apps)
  const basic =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // extra checks to avoid common mistakes
  const hasConsecutiveDots = email.includes("..");
  const startsOrEndsWithDot =
    email.startsWith(".") ||
    email.endsWith(".") ||
    email.split("@")[0].endsWith(".") ||
    email.split("@")[1].startsWith(".");

  return basic.test(email) && !hasConsecutiveDots && !startsOrEndsWithDot;
};

const Email = () => {
  const { setStep } = useStep();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = useMemo(() => isValidEmail(email), [email]);
  const showError = touched && !valid && email.length > 0;

  const onContinue = () => {
    if (!valid) {
      setTouched(true);
      return;
    }
    setStep(4);
    router.push("/steps/verify-code");
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
          <Text className="font-poppins-medium text-4xl mb-2">My email</Text>

          <Text className="font-poppins-regular text-gray-500">
            Please enter your email. We will send you a 4-digit code to verify your account.
          </Text>

          <View className="w-full">
            <InputField
              value={email}
              handleChangeText={(txt) => {
                // normalize as user types
                setEmail(txt.trimStart().toLowerCase());
                if (!touched) setTouched(true);
              }}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
              onBlur={() => setTouched(true)}
              returnKeyType="done"
            />
            {showError && (
              <Text className="mt-2 text-sm text-red-500 font-poppins-regular">
                Enter a valid email address (e.g., name@example.com)
              </Text>
            )}
          </View>
        </View>

        {/* Fixed bottom button */}
        <View className="w-full">
          <CustomButton
            text="Continue"
            handlePress={onContinue}
            containerStyles={`w-full h-[48px] ${!valid ? "opacity-60" : ""}`}
            disabled={!valid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Email;
