import React, { useMemo, useState } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
  Easing,
} from "react-native-reanimated";

import SwipeLikeCard from "../../components/SwipeLikeCard";
import { dummyUsers, LikeFilterOptions } from "../../data/mockData";
import TabButtonSection from "../../components/TabButtonSection";

const Likes = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [users, setUsers] = useState(dummyUsers);
  const [activeId, setActiveId] = useState(null);

  const data = useMemo(() => {
    return users;
  }, [users]);

  const removeUser = (u) => {
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
    setActiveId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-center px-4 pt-4 my-2">
        <Text className="font-poppins-semibold text-3xl text-gray-900">
          Matches
        </Text>
      </View>

      {/* Tagline */}
      <Text className="font-poppins-medium text-center text-sm text-gray-700 mt-1 mx-4">
        See who likes you and match with them instantly
      </Text>

      {/* Filter row */}
      <TabButtonSection
        options={LikeFilterOptions}
        selectedValue={selectedFilter}
        onChange={setSelectedFilter}
      />

      {/* Divider */}
      {/* <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
            marginHorizontal: 10,
          }}
        /> */}

      {/* 2-column grid */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 300,
          marginTop: 0,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const isActive = activeId === item.id;
          return (
            <Animated.View
              layout={LinearTransition.duration(250).easing(
                Easing.out(Easing.cubic)
              )}
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(150)}
              style={[
                { width: "48%", marginBottom: 16, position: "relative" },
                isActive && { zIndex: 100, elevation: 1000 }, // float above neighbors while dragging
              ]}
            >
              <SwipeLikeCard
                user={item}
                onSwipeLeft={removeUser}
                onSwipeRight={removeUser}
                onDragStart={(u) => setActiveId(u.id)}
                onDragEnd={() => setActiveId(null)}
              />
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Likes;
