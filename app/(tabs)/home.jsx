import { SafeAreaView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TinderSwiper from "../../components/TinderSwiper";
import { dummyUsers } from "../../data/mockData";
import { Image } from "expo-image";
import { useState } from "react";
import BottomSheetModal from "../../components/BottomSheetModal";
import { Portal } from "react-native-paper";
import SwipeButtons from "../../components/SwipeButtons";
import SwipeFilter from "../../components/SwipeFilter";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              icon={icons.notification}
              iconWidth={24}
              iconHeight={24}
              iconColor="#777777"
              handlePress={() => router.back()}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />
            <CustomButtonWithIcon
              icon={icons.filter}
              iconWidth={24}
              iconHeight={24}
              iconColor="#777777"
              handlePress={() => setIsModalVisible(true)}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />
          </View>
        </View>

        {/* Swiper in the center */}
        <View style={{ flex: 1 }}>
          <TinderSwiper users={dummyUsers} />
        </View>

        {/* Bottom action buttons */}
        <View className="flex-row justify-center items-center gap-4 pb-6">
          <SwipeButtons
            icon={icons.previousMain}
            iconWidth={28}
            iconHeight={28}
            handlePress={() => console.log("Undo")}
            containerStyles="w-[45px] h-[45px]"
            isOutline={true}
          />
          <SwipeButtons
            icon={icons.passMain}
            iconWidth={36}
            iconHeight={36}
            handlePress={() => console.log("Pass")}
            containerStyles="w-[60px] h-[60px]"
            isOutline={true}
          />
          <SwipeButtons
            icon={icons.superlikeMain}
            iconWidth={28}
            iconHeight={28}
            handlePress={() => console.log("Superlike")}
            containerStyles="w-[50px] h-[50px]"
            isOutline={true}
          />
          <SwipeButtons
            icon={icons.likeMain}
            iconWidth={36}
            iconHeight={36}
            handlePress={() => console.log("Like")}
            containerStyles="w-[60px] h-[60px]"
            isOutline={true}
          />
          <SwipeButtons
            icon={icons.sendMessageMain}
            iconWidth={28}
            iconHeight={28}
            handlePress={() => console.log("Message")}
            containerStyles="w-[45px] h-[45px] "
            isOutline={true}
          />
        </View>

        {/* BottomSheetModal */}
        <Portal>
          <BottomSheetModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            header="Filter"
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
