import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      {/* todo: use themprovider to switch dark mode and light mode */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="phonenumber"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="verify-code"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="profile-details"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="interests"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="friends"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            headerShown: false,
            // animation: "slide_from_right",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
