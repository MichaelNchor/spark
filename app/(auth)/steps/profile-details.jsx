import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import { useStep } from "../../../state/StepContext";

const DATA = [
  {
    id: "1",
    text: "Male",
    image: require("../../../assets/images/profile-image-man.jpg"),
  },
];

const ProfileDetails = () => {
  const { setStep } = useStep();
  const [firstName, setFirstName] = useState("David");
  const [lastName, setLastName] = useState("Peterson");
  const [birthDate, setBirthDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirmDate = (date) => {
    setBirthDate(date);
    setDatePickerVisibility(false);
  };

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

          <Text className="font-poppins-bold text-4xl">Profile details</Text>

          <View className="items-center mt-16 mb-8">
            <View className="relative">
              <Image
                source={DATA[0].image}
                className="rounded-3xl"
                contentFit="contain"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                }}
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-white">
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <InputField
            text="First name"
            value={firstName}
            handleChangeText={setFirstName}
          />

          <InputField
            text="Last name"
            value={lastName}
            handleChangeText={setLastName}
          />

          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            className="flex-row items-center gap-2 bg-pink-50 border-pink-200 rounded-full px-4 py-3 h-16"
          >
            <Ionicons name="calendar-outline" size={20} color="#E94057" />
            <Text className="text-primary font-poppins-regular">
              {birthDate ? birthDate.toDateString() : "Choose birthday date"}
            </Text>
          </TouchableOpacity>

          <CustomButton
            text="Confirm"
            handlePress={() => {
              setStep(4);
              router.push("/steps/gender");
            }}
            containerStyles="w-full h-[48px] mt-14"
          />
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={new Date("1980-01-01")}
        maximumDate={new Date("2008-01-01")}
      />
    </SafeAreaView>
  );
};

export default ProfileDetails;
