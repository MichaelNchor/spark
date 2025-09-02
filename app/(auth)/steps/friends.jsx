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
import { useStep } from "../../../state/StepContext";

const Friends = () => {
  const { setStep } = useStep();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-5">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 140, // extra padding so content scrolls above button
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full gap-8">
            {/* Skip button */}
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

            {/* Main Content */}
            <View className="items-center mt-16 mb-8">
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
              <View className="flex gap-4">
                <Text className="font-poppins-medium text-3xl text-center">
                  Add Friends
                </Text>

                <Text className="font-poppins-regular text-gray-500 text-center">
                  You can find friends from your contact lists to connect
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky bottom button with pb-12 */}
        <View className="px-6 pb-12">
        <CustomButton
          text="Access to your contact list"
          handlePress={() => {
            setStep(6);
            router.push("/steps/notifications");
          }}
          containerStyles="w-full h-[48px]"
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Friends;
