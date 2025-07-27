import { Link, router } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CarouselSlider from "../components/CarouselSlider";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          paddingHorizontal: 30,
        }}
      >
        <View className="w-full h-full justify-center items-center">
          <CarouselSlider />
          <CustomButton
            title="Create an account"
            handlePress={() => router.push("/phonenumber")}
            containerStyles="w-full h-[64px] my-6"
          />
          <Text className="text-base font-poppins-medium text-gray-500">
            Already have an account?
            <Link
              href={"/friends"}
              className="text-primary font-poppins-medium text-lg"
            >
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
