import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import icons from "../../assets/constants";
import CustomButton from "../../components/CustomButton";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";

const SignUp = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full h-full justify-center items-center">
          <Image
            source={icons.logo}
            contentFit="contain"
            style={{ width: 125, height: 125, marginBottom: 90 }}
          />
          <Text className="font-poppins-bold text-xl text-center mb-12 text-gray-700">
            Sign up to continue
          </Text>
          <View className="w-full items-center gap-3">

            <CustomButton
              title="Continue with email"
              handlePress={() => router.push("/phonenumber")}
              containerStyles="w-full h-[64px]"
            />

            <CustomButton
              title="Use phone number"
              handlePress={() => router.push("/phonenumber")}
              containerStyles="w-full h-[64px]"
              isOutline={true}
            />

          </View>
          <View className="flex-row items-center my-6 w-full px-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500 font-poppins-regular text-sm">
              or sign up with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>
          <View className="flex-row gap-6 m-4">
            <CustomButtonWithIcon
              icon={icons.facebook}
              iconColor="#E94057"
              handlePress={() => router.push("/")}
              containerStyles="w-[64px] h-[64px]"
              isOutline={true}
            />
            <CustomButtonWithIcon
              icon={icons.google}
              iconColor="#E94057"
              handlePress={() => router.push("/")}
              containerStyles="w-[64px] h-[64px]"
              isOutline={true}
            />
            <CustomButtonWithIcon
              icon={icons.apple}
              iconColor="#E94057"
              handlePress={() => router.push("/")}
              containerStyles="w-[64px] h-[64px]"
              isOutline={true}
            />
          </View>
          <View className="flex-row justify-center items-center gap-9 mt-24">
            <Link href="/terms">
              <Text className="text-base font-poppins-medium text-primary underline">
                Terms of Use
              </Text>
            </Link>
            <Link href="/privacy">
              <Text className="text-base font-poppins-medium text-primary underline">
                Privacy Policy
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
