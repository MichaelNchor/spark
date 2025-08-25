import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
    screenOptions={{
      contentStyle: {
        backgroundColor: "#121212"
      }
    }}
    >
      <Stack.Screen name="[id]" options={{headerShown: false }} />
    </Stack>
  );
}
