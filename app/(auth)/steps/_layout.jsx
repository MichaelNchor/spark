import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../../../components/ProgressBar";
import { StepProvider, useStep } from "../../../state/StepContext";

const StepsContent = () => {
  const { step, totalSteps } = useStep();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 7, backgroundColor: "white" }}>
      <ProgressBar step={step} totalSteps={totalSteps} />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="profile-details" />
        <Stack.Screen name="gender" />
        <Stack.Screen name="interests" />
        <Stack.Screen name="phonenumber" />
        <Stack.Screen name="verify-code" />
        <Stack.Screen name="friends" />
        <Stack.Screen name="notifications" />
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
