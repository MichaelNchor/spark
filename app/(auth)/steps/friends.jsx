import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import icons from "../../../assets/constants";
import { Image } from "expo-image";
import CustomButton from "../../../components/CustomButton";

const friends = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingTop: 90,
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full gap-8">
          <View className="w-full items-end">
            <TouchableOpacity
              className="px-4 py-2"
              onPress={() => router.push("/home")}
            >
              <Text className="text-primary text-base font-poppins-medium">
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-center mt-16 mb-8">
            <View className="">
              <Image
                source={icons.people}
                className="rounded-3xl"
                contentFit="contain"
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 24,
                }}
              />
            </View>
            <View>
              <Text className="font-poppins-semibold text-2xl text-center">
                Profile details
              </Text>

              <Text className="font-poppins-regular text-gray-500 text-center">
                You can find friens from your contact lists to connected
              </Text>
            </View>
          </View>
        </View>
        <CustomButton
          text="Access to your contact list"
          handlePress={() => router.push("/steps/notifications")}
          containerStyles="w-full h-[48px]"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default friends;