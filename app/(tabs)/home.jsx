import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from "../../assets/constants";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TinderSwiper from "../../components/TinderSwiper";
import { dummyUsers } from "../../data/mockData";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
            paddingTop: 50,
            paddingHorizontal: 10
          }}
        >
          <View className="w-full">
            <View className="w-full flex-row items-center justify-end">
              <CustomButtonWithIcon
                icon={icons.undo}
                iconWidth={24}
                iconHeight={24}
                iconColor="#E94057"
                handlePress={() => router.back()}
                containerStyles="w-[50px] h-[50px] items-start"
                isOutline={true}
              />

              <CustomButtonWithIcon
                icon={icons.filterOutline}
                iconWidth={24}
                iconHeight={24}
                iconColor="#E94057"
                handlePress={() => setIsFilterOpen(true)}
                containerStyles="w-[50px] h-[50px] items-start"
                isOutline={true}
              />
            </View>
            <View className="w-full flex-row">
              <TinderSwiper
              users={dummyUsers}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
