import { SafeAreaView, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { router } from "expo-router";
import TinderSwiper from "../../components/TinderSwiper";
import { dummyUsers } from "../../data/mockData";
import { Image } from "expo-image";
import { useState, useRef } from "react";
import BottomSheetModal from "../../components/BottomSheetModal";
import SwipeButton from "../../components/SwipeButton";
import MainSwipeButton from "../../components/MainSwipeButton";
import SwipeFilter, { DEFAULT_FILTERS } from "../../components/SwipeFilter";
import FilterFooter from "../../components/FilterFooter";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const Home = () => {  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [draft, setDraft] = useState(DEFAULT_FILTERS);
  const BOTTONBOTTOM_SPACE = 46;
  const tabBarH = useBottomTabBarHeight();

  const openSheet = () => {
    setDraft(filters);
    setIsModalVisible(true);
  };

  const handleReset = () => setDraft(DEFAULT_FILTERS);

  const handleApply = () => {
    setFilters(draft);
    setIsModalVisible(false);
  };
  const swiperRef = useRef();

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 20, backgroundColor: "white" }}
    >
      {/* Top bar with logo left, icons right */}
      <View
        className="w-full flex-row items-center justify-between px-4 pt-4 my-2"
      >
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
            icon={icons.filter2}
            iconWidth={24}
            iconHeight={24}
            iconColor="black"
            handlePress={openSheet}
            containerStyles="w-[45px] h-[45px] items-start"
            isOutline={true}
          />
        </View>
      </View>

      {/* Swiper in the center */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          overflow: "hidden",
          zIndex: 0,
          elevation: 0,
        }}
      >
        <TinderSwiper ref={swiperRef} users={dummyUsers} />
      </View>

      {/* Bottom action buttons */}
      <View
        style={{
          position: "absolute",
          bottom: tabBarH + BOTTONBOTTOM_SPACE - 14,
          left: 0,
          right: 0
        }}
        className="flex-row justify-center items-center gap-4"
      >
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
      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        header="Filter"
        footer={<FilterFooter onReset={handleReset} onApply={handleApply} />}
      >
        <SwipeFilter value={draft} onChange={setDraft} />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default Home;
