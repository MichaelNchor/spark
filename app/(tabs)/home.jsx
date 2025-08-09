import { SafeAreaView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from "../../assets/constants";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TinderSwiper from "../../components/TinderSwiper";
import { dummyUsers } from "../../data/mockData";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginTop: 20,  }}>
        {/* Top right buttons */}
        <View className="w-full flex-row items-center justify-end px-4 pt-4">
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
            icon={icons.filterOutline}
            iconWidth={24}
            iconHeight={24}
            iconColor="#777777"
            handlePress={() => console.log("Filter")}
            containerStyles="w-[50px] h-[50px] items-start"
            isOutline={true}
          />
        </View>

        {/* Swiper in the center */}
        <View style={{ flex: 1 }}>
          <TinderSwiper users={dummyUsers} />
        </View>

        {/* Bottom action buttons */}
        <View className="flex-row justify-center items-center gap-4 pb-6">
          <CustomButtonWithIcon
            icon={icons.previousMain}
            iconWidth={28}
            iconHeight={28}
            iconColor=""
            handlePress={() => console.log("Left Action")}
            containerStyles="w-[45px] h-[45px] items-center justify-center bg-[#333333] rounded-full"
            isOutline={true}
          />
          <CustomButtonWithIcon
            icon={icons.passMain}
            iconWidth={36}
            iconHeight={36}
            iconColor=""
            handlePress={() => console.log("Middle Action")}
            containerStyles="w-[60px] h-[60px] items-center justify-center bg-[#333333] rounded-full"
            isOutline={true}
          />
          <CustomButtonWithIcon
            icon={icons.superlikeMain}
            iconWidth={28}
            iconHeight={28}
            iconColor=""
            handlePress={() => console.log("Right Action")}
            containerStyles="w-[50px] h-[50px] items-center justify-center bg-[#333333] rounded-full"
            isOutline={true}
          />
          <CustomButtonWithIcon
            icon={icons.likeMain}
            iconWidth={36}
            iconHeight={36}
            iconColor=""
            handlePress={() => console.log("Right Action")}
            containerStyles="w-[60px] h-[60px] items-center justify-center bg-[#333333] rounded-full"
            isOutline={true}
          />
          <CustomButtonWithIcon
            icon={icons.sendMessageMain}
            iconWidth={28}
            iconHeight={28}
            iconColor=""
            handlePress={() => console.log("Right Action")}
            containerStyles="w-[50px] h-[50px] items-center justify-center bg-[#333333] rounded-full"
            isOutline={true}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
