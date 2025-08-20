import React, { useRef } from "react";
import {
  Animated,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { dummyUsers } from "../../data/mockData";
import MediaGallery from "../../components/MediaGallery";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import icons from "../../assets/constants";
import { Image } from "expo-image";

const { height: screenHeight } = Dimensions.get("window");
const HEADER_HEIGHT = screenHeight * 0.75; // top gallery height

const UserProfile = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const user = dummyUsers.find((u) => u.id.toString() === id);

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">User not found</Text>
      </View>
    );
  }

  const translateY = scrollY.interpolate({
    inputRange: [-200, 0, HEADER_HEIGHT],
    outputRange: [-100, 0, HEADER_HEIGHT * 0.7], // moves slower as you scroll
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [1.4, 1], // zoom when pulling down
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <View className="flex-1">
        {/* Scrollable content */}
        <Animated.ScrollView
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {/* Top Parallax Header */}
          <Animated.View
            style={{
              height: HEADER_HEIGHT,
              width: "100%",
              overflow: "hidden",
              transform: [{ translateY }, { scale }],
            }}
            className="rounded-b-[30px]"
          >
            <MediaGallery media={user.media} />
          </Animated.View>

          {/* User Info Section */}
          <View className="px-6 py-5  bg-[#1c1c1e] rounded-3xl mt-[-10px]">
            <View className="flex-row items-center justify-between my-2 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-white text-3xl font-poppins-bold">
                  {`${user.name}, ${user.age}`}
                </Text>
                {/* Verified */}
                {user.isVerified && (
                  <Image
                    source={icons.verified}
                    style={{ width: 25, height: 25, marginHorizontal: 7 }}
                    contentFit="contain"
                  />
                )}
              </View>

              {/* Online/Offline Badge */}
              <View>
                <Text
                  className={`text-sm px-3 py-1 font-poppins-medium rounded-full ${
                    user.isOnline
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            </View>
            <Text className="text-gray-300 text-sm mt-2 font-poppins-medium">
              🔎 {"Looking for"}
            </Text>
            <Text className="text-gray-300 text-base mt-4 font-poppins-medium">
              {user.lookingFor}
            </Text>
          </View>

          {/* About / Me */}
          <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
            <Text className="text-white text-sm font-poppins-semibold mb-4">
              About me
            </Text>
            <Text className="text-gray-200 text-base font-poppins-medium">
              {user.bio}
            </Text>
          </View>

          {/* Interests */}
          {user.interests?.length > 0 && (
            <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
              <Text className="text-white text-sm font-poppins-semibold mb-4">
                Interests
              </Text>
              <View className="flex-row flex-wrap">
                {user.interests.map((interest, index) => (
                  <View
                    key={index}
                    className="border-[1.5px] border-[#E94057] px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-gray-200 text-base font-poppins-medium">
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Occupation / Education */}
          <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
            <Text className="text-white text-sm font-poppins-semibold mb-4">
              Career & Education
            </Text>
            <Text className="text-gray-200 text-base font-poppins-medium">
              💼 {user.occupation}
            </Text>
            <Text className="text-gray-200 text-base font-poppins-medium mt-1">
              🎓 {user.education}
            </Text>
          </View>

          {/* Location */}
          <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
            <Text className="text-white text-sm font-poppins-semibold mb-4">
              Location
            </Text>
            <Text className="text-gray-300 font-poppins-medium mb-2">
              📍{user.location.distance}
            </Text>
            <Text className="text-gray-300 font-poppins-medium mb-2">
              🌍{user.location.place}
            </Text>
          </View>

          {/* Essentials Section */}
          <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
            <Text className="text-white text-sm font-poppins-semibold mb-4">
              Essentials
            </Text>

            {user.dob && (
              <Text className="text-gray-200 text-base font-poppins-medium mb-2">
                🎂 {user.dob}
              </Text>
            )}
            {user.height && (
              <Text className="text-gray-200 text-base font-poppins-medium mb-2">
                📏 {user.height}
              </Text>
            )}
            {user.gender && (
              <Text className="text-gray-200 text-base font-poppins-medium mb-2">
                🚻 {user.gender}
              </Text>
            )}
            {user.zodiac && (
              <Text className="text-gray-200 text-base font-poppins-medium mb-2">
                ♌ {user.zodiac}
              </Text>
            )}
          </View>

          {/* About / Me */}
          <View className="px-6 py-5 mt-2 bg-[#1c1c1e] rounded-3xl">
            <Text className="text-white text-sm font-poppins-semibold mb-4">
              Send a love note
            </Text>
            <Text className="text-gray-200 text-sm font-poppins-medium mb-2">
              👉💖 Send a special message before matching to stand out.
            </Text>
            <TouchableOpacity className="border-[1.5px] border-[#E94057] px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-white py-1 font-poppins-medium text-base">Your message</Text>
            </TouchableOpacity>
          </View>

          {/* Share / Block / Report Section */}
          <TouchableOpacity className="px-6 py-5 mt-2 bg-[#333333] rounded-3xl">
            <Text className="text-gray-200 text-base text-center font-poppins-medium mt-1">
              Share {user.name}
            </Text>
          </TouchableOpacity>

          {/* Share / Block / Report Section */}
          <TouchableOpacity className="px-6 py-5 mt-2 bg-[#333333] rounded-3xl">
            <Text className="text-gray-200 text-base text-center font-poppins-medium mt-1">
              Block {user.name}
            </Text>
          </TouchableOpacity>

          {/* Share / Block / Report Section */}
          <TouchableOpacity className="px-6 py-5 mt-2 mb-8 bg-[#333333] rounded-3xl">
            <Text className="text-red-600 text-base text-center font-poppins-semibold mt-1">
              Report {user.name}
            </Text>
          </TouchableOpacity>
        </Animated.ScrollView>

        {/* Floating Back Button */}
        <View className="absolute top-10 left-5 z-10">
          <CustomButtonWithIcon
            icon={icons.back}
            iconWidth={24}
            iconHeight={24}
            iconColor="#ffffff"
            handlePress={() => router.back()}
            containerStyles="w-[45px] h-[45px] items-center justify-center bg-black/40"
            backgroundColor="[#43434359]"
            isOutline={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
