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

const Notifications = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-5">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100, // space so content doesn’t overlap button
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
              <Image
                source={icons.notifications}
                className="rounded-3xl"
                contentFit="contain"
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 24,
                }}
              />
              <View className="flex gap-4">
                <Text className="font-poppins-medium text-3xl text-center">
                  Enable Notifications
                </Text>

                <Text className="font-poppins-regular text-gray-500 text-center">
                  Get push-notifications when you get matched or receive a
                  message
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky bottom button */}
        <View className="px-6 pb-12">
          <CustomButton
            text="I want to be notified"
            handlePress={() => {
              router.push("/home");
            }}
            containerStyles="w-full h-[48px]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
