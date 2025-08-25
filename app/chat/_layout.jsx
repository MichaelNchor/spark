import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor: "#121212"
      }
    }}
    >
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
