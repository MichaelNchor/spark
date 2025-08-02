import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from "../../assets/constants";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TinderSwiper from "../../components/TinderSwiper";

const dummyUsers = [
  {
    id: "1",
    name: "Jessica, 25",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBmYWNlfGVufDB8fDB8fHww&w=1000&q=80",
      },
      {
        type: "video",
        uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww&w=1000&q=80",
      },
    ],
  },
  {
    id: "2",
    name: "Daniel, 30",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVuJTIwc3R5bGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      },
    ],
  },
];


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
