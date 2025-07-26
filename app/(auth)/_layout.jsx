import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="phonenumber"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify-code"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile-details"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gender"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
