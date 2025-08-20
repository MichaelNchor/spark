import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="steps" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="birthday" />
      <Stack.Screen name="email" />
      <Stack.Screen name="oops" />
    </Stack>
  );
}
