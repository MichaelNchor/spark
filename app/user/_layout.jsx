import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{headerShown: false }} />
    </Stack>
  );
}
