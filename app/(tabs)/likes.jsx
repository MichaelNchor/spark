import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Image } from "expo-image";
import icons from "../../assets/constants";
import LikeCard from "../../components/LikeCard";
import { dummyUsers, LikeFilterOptions } from "../../data/mockData";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import TabButtonSection from "../../components/TabButtonSection";

const Likes = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      {/* Top bar with logo left, icons right */}
      <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
        {/* Logo on the left */}
        <Image
          source={icons.logo}
          style={{ width: 120, height: 50 }}
          contentFit="cover"
        />
        {/* Right icons */}
        <View className="flex-row items-center gap-3">
          <CustomButtonWithIcon
            icon={icons.filter}
            iconWidth={24}
            iconHeight={24}
            iconColor="#777777"
            // handlePress={() => setIsModalVisible(true)}
            containerStyles="w-[50px] h-[50px] items-start"
            isOutline={true}
          />
        </View>
      </View>

      {/* Tag line */}
      <Text className="font-poppins-medium text-sm text-gray-300 mt-2 mx-4">
        See who likes you and match with them instantly
      </Text>

      {/* Filter Row */}
      <TabButtonSection
        options={LikeFilterOptions}
        selectedValue={selectedFilter}
        onChange={setSelectedFilter}
      />

      {/* Divider */}
      <View
        style={{
          borderBottomColor: "#777777",
          borderBottomWidth: 0.5,
          marginHorizontal: 10,
        }}
      />

      {/* Likes Grid */}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingBottom: 20,
          marginTop: 30,
        }}
      >
        {/* Dummy users */}
        {dummyUsers.map((user) => (
          <LikeCard key={user.id} user={user} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Likes;
