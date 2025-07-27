import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomButtonWithIcon from "../../components/CustomButtonWithImage";
import icons from '../../assets/constants'
import { router } from "expo-router";
import Carousel from "react-native-reanimated-carousel";


const DATA = [
  {
    id: "1",
    title: "Algorithm",
    description:
      "Users go through vetting to ensure you never match with bots.",
    image: require("../../assets/images/girl1.png"),
  },
  {
    id: "2",
    title: "Real People",
    description: "Only verified profiles for a genuine dating experience.",
    image: require("../../assets/images/girl2.png"),
  },
  {
    id: "3",
    title: "Privacy First",
    description: "Your data is protected and never shared without consent.",
    image: require("../../assets/images/girl3.png"),
  },
];

const Home = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingTop: 90,
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full gap-4">
          <View className="w-full flex-row items-center justify-between">
            <CustomButtonWithIcon
              icon={icons.back}
              iconWidth={24}
              iconHeight={24}
              iconColor="#E94057"
              handlePress={() => router.back()}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />

            <CustomButtonWithIcon
              icon={icons.filter}
              iconWidth={24}
              iconHeight={24}
              iconColor="#E94057"
              handlePress={() => router.back()}
              containerStyles="w-[50px] h-[50px] items-start"
              isOutline={true}
            />
          </View>
          <View className="w-full flex-row">

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
