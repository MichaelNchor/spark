import { Stack } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ProgressBar from "../../../components/ProgressBar";
import { StepProvider, useStep } from "../../../state/StepContext";

const StepsContent = () => {
  const { step, totalSteps } = useStep();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 7 }}>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="friends" />
        <Stack.Screen name="gender" />
        <Stack.Screen name="interests" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="phonenumber" />
        <Stack.Screen name="profile-details" />
        <Stack.Screen name="verify-code" />
      </Stack>
    </SafeAreaView>
  );
};

export default function StepsLayout() {
  return (
    <StepProvider>
      <StepsContent />
    </StepProvider>
  );
}
