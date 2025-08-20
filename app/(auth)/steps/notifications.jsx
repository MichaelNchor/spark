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
                  source={icons.notifications}
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
                  Enable Notifications
                </Text>
  
                <Text className="font-poppins-regular text-gray-500 text-center">
                  Get push-notifications when you get matched or receive a message
                </Text>
              </View>
            </View>
          </View>
          <CustomButton
            title="I want to be notified"
            handlePress={() => router.push("/steps/gender")}
            containerStyles="w-full h-[64px]"
          />
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Notifications;