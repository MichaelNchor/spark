import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Image } from "expo-image";
import icons from "../../assets/constants";
import LikeCard from "../../components/LikeCard";
import { dummyUsers, LikeFilterOptions } from "../../data/mockData";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import TabButtonSection from "../../components/TabButtonSection";
import SwipeLikeCard from "../../components/SwipeLikeCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Likes = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        {/* Top bar with logo left, icons right */}
        <View className="w-full flex-row items-center justify-center px-4 pt-4 my-2">
          {/* Logo on the left */}
          <Image
            source={icons.logo}
            style={{ width: 80, height: 30 }}
            contentFit="cover"
          />
        </View>

        {/* Tag line */}
        <Text className="font-poppins-medium text-center text-sm text-gray-300 mt-2 mx-4">
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
            <SwipeLikeCard
              key={user.id}
              user={user}
              onSwipeLeft={(u) => console.log("Dismissed:", u.name)}
              onSwipeRight={(u) => console.log("Liked:", u.name)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Likes;
