import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../components/CustomButton";

const ProfileDetails = () => {
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
          paddingTop: 100,
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full gap-6">
          <View className="flex-row justify-between items-center">
            <Text className="font-poppins-bold text-4xl">Profile details</Text>
            <TouchableOpacity onPress={() => router.push("/home")}>
              <Text className="text-pink-500 text-base font-medium">Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image */}
          <View className="items-center">
            <View className="relative">
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                className="w-28 h-28 rounded-full"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-2">
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <TextInput
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            className="border border-gray-200 rounded-xl px-4 py-3 text-base font-poppins-regular"
          />

          <TextInput
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            className="border border-gray-200 rounded-xl px-4 py-3 text-base font-poppins-regular"
          />

          {/* Birthday Picker */}
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            className="flex-row items-center gap-2 bg-pink-50 border border-pink-200 rounded-xl px-4 py-3"
          >
            <Ionicons name="calendar-outline" size={20} color="#ec4899" />
            <Text className="text-pink-500 font-poppins-regular">
              {birthDate ? birthDate.toDateString() : "Choose birthday date"}
            </Text>
          </TouchableOpacity>

          <CustomButton
            title="Confirm"
            handlePress={() => router.push("/verify-code")}
            containerStyles="w-full h-[64px] mt-8"
          />
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()}
      />
    </SafeAreaView>
  );
};

export default ProfileDetails;
