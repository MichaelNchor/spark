import { SafeAreaView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TinderSwiper from "../../components/TinderSwiper";
import { dummyUsers } from "../../data/mockData";
import { Image } from "expo-image";
import { useState, useRef } from "react";
import BottomSheetModal from "../../components/BottomSheetModal";
import { Portal } from "react-native-paper";
import SwipeButton from "../../components/SwipeButton";
import SwipeFilter from "../../components/SwipeFilter";
import MainSwipeButton from "../../components/MainSwipeButton";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const swiperRef = useRef();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        {/* Top bar with logo left, icons right */}
        <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
          {/* Logo on the left */}
          <Image
            source={icons.logo}
            style={{ width: 80, height: 30 }}
            contentFit="cover"
          />
          {/* Right icons */}
          <View className="flex-row items-center gap-3">
            <CustomButtonWithIcon
              icon={icons.undo}
              iconWidth={24}
              iconHeight={24}
              iconColor="black"
              handlePress={() => router.back()}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />
            <CustomButtonWithIcon
              icon={icons.filter}
              iconWidth={24}
              iconHeight={24}
              iconColor="black"
              handlePress={() => setIsModalVisible(true)}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />
          </View>
        </View>

        {/* Swiper in the center */}
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <TinderSwiper ref={swiperRef} users={dummyUsers} />
        </View>

        {/* Bottom action buttons */}
        <View className="absolute bottom-32 left-0 right-0 flex-row justify-center items-center gap-4">
          <SwipeButton
            icon={icons.cross}
            iconWidth={28}
            iconHeight={28}
            iconColor={"white"}
            handlePress={() => swiperRef.current.swipeLeft()}
            containerStyles="w-[50px] h-[50px]"
            isOutline={true}
          />
          <MainSwipeButton
            icon={icons.star}
            iconWidth={36}
            iconHeight={36}
            iconColor={"white"}
            handlePress={() => swiperRef.current.swipeUp()}
            containerStyles="w-[60px] h-[60px]"
            isOutline={true}
          />
          <SwipeButton
            icon={icons.heart}
            iconWidth={28}
            iconHeight={28}
            iconColor={"white"}
            handlePress={() => swiperRef.current.swipeRight()}
            containerStyles="w-[50px] h-[50px]"
            isOutline={true}
          />
        </View>

        {/* BottomSheetModal */}
        <Portal>
          <BottomSheetModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            {/* You can put your filter options here */}
            <SwipeFilter />
          </BottomSheetModal>
        </Portal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
