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
import { LinearGradient } from "expo-linear-gradient";

const { height: screenHeight } = Dimensions.get("window");
const HEADER_HEIGHT = screenHeight * 0.75; // top gallery height

const UserProfile = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const user = dummyUsers.find((u) => u.id.toString() === id);

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">User not found</Text>
      </View>
    );
  }

  const translateY = scrollY.interpolate({
    inputRange: [-600, 0, HEADER_HEIGHT],
    outputRange: [-100, 0, HEADER_HEIGHT * 0.7], // moves slower as you scroll
    extrapolate: "clamp",
  });

  const scale = scrollY.interpolate({
    inputRange: [-600, 0],
    outputRange: [1.4, 1], // zoom when pulling down
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView className="flex-1">
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
          <View
            className="px-6 py-5  bg-white rounded-3xl mt-[-10px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <View className="flex-row items-center justify-between my-2 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-black text-3xl font-poppins-medium">
                  {`${user.name} ${user.age}`}
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
                      : "bg-gray-600 text-gray-200"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            </View>
            <Text className="text-black text-sm mt-2 font-poppins-medium">
              🔎 {"Looking for"}
            </Text>
            <Text className="text-black text-base mt-4 font-poppins-regular">
              {user.lookingFor}
            </Text>
          </View>

          {/* About / Me */}
          <View
            className="px-6 py-5 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <Text className="text-black text-sm font-poppins-semibold mb-4">
              {"About me"}
            </Text>
            <Text className="text-black text-base font-poppins-regular">
              {user.bio}
            </Text>
          </View>

          {/* Interests */}
          {user.interests?.length > 0 && (
            <View className="px-6 py-5 mt-2 rounded-3xl bg-white">
              <Text className="text-black text-sm font-poppins-semibold mb-4">
                Interests
              </Text>

              <View className="flex-row flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <LinearGradient
                    key={index}
                    colors={["#fd297b", "#ff5864", "#ff655b"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 999,
                      flexDirection: "row",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.12,
                      shadowRadius: 6,
                      shadowOffset: { width: 0, height: 3 },
                      elevation: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      {interest}
                    </Text>
                  </LinearGradient>
                ))}
              </View>
            </View>
          )}

          {/* Occupation / Education */}
          <View
            className="px-6 py-5 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <Text className="text-black text-sm font-poppins-semibold mb-4">
              Career & Education
            </Text>
            <Text className="text-gray-600 text-base font-poppins-regular">
              💼 {user.occupation}
            </Text>
            <Text className="text-gray-600 text-base font-poppins-regular mt-1">
              🎓 {user.education}
            </Text>
          </View>

          {/* Location */}
          <View
            className="px-6 py-5 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <Text className="text-black text-sm font-poppins-semibold mb-4">
              Location
            </Text>
            <Text className="text-gray-600 font-poppins-regular mb-2">
              📍{user.location.distance}
            </Text>
            <Text className="text-gray-600 font-poppins-regular mb-2">
              🌍{user.location.place}
            </Text>
          </View>

          {/* Essentials Section */}
          <View
            className="px-6 py-5 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <Text className="text-black text-sm font-poppins-semibold mb-4">
              Essentials
            </Text>

            {user.dob && (
              <Text className="text-gray-600 text-base font-poppins-regular mb-2">
                🎂 {user.dob}
              </Text>
            )}
            {user.height && (
              <Text className="text-gray-600 text-base font-poppins-regular mb-2">
                📏 {user.height}
              </Text>
            )}
            {user.gender && (
              <Text className="text-gray-600 text-base font-poppins-regular mb-2">
                🚻 {user.gender}
              </Text>
            )}
            {user.zodiac && (
              <Text className="text-gray-600 text-base font-poppins-regular mb-2">
                ♌ {user.zodiac}
              </Text>
            )}
          </View>

          {/* About / Me */}
          <View
            className="px-6 py-5 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <Text className="text-black text-sm font-poppins-semibold mb-4">
              Send a love note
            </Text>
            <Text className="text-gray-600 text-sm font-poppins-regular mb-2">
              👉💖 Send a special message before matching to stand out.
            </Text>
            <TouchableOpacity className="border-[1.5px] border-[#E94057] px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-gray-400 py-1 font-poppins-medium text-base">
                Your message
              </Text>
            </TouchableOpacity>
          </View>

          {/* Share */}
          <TouchableOpacity
            className="px-6 py-1 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <View className="flex-row justify-center items-center py-5 px-4">
              <View className="flex-row items-center">
                <Text
                  className="ml-3 text-base font-poppins-regular"
                  style={{ color: "#000" }}
                >
                  Share {user.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Block */}
          <TouchableOpacity
            className="px-6 py-1 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <View className="flex-row justify-center items-center py-5 px-4">
              <View className="flex-row items-center">
                <Text
                  className="ml-3 text-base font-poppins-regular"
                  style={{ color: "#000" }}
                >
                  Block {user.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Report */}
          <TouchableOpacity
            className="px-6 py-1 mt-1 bg-white rounded-3xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 6,
              elevation: 6,
              borderColor: "#000",
            }}
          >
            <View className="flex-row justify-center items-center py-5 px-4">
              <View className="flex-row items-center">
                <Text
                  className="ml-3 text-base font-poppins-regular"
                  style={{ color: "#ef4444" }}
                >
                  Report {user.name}
                </Text>
              </View>
            </View>
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
