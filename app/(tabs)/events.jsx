import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomButtonWithIcon from "../../components/CustomButtonWithIcon";
import { Image, ImageBackground } from "expo-image";
import icons from "../../assets/constants";
import Carousel from "react-native-reanimated-carousel";
import { EventBanners } from "../../data/mockData";
import { LinearGradient } from "expo-linear-gradient";
import { EventTabs } from "../../data/mockData";
import TabButtonSection from "../../components/TabButtonSection";
import InputField from "../../components/InputField";
import { mockEvents } from "../../data/mockData";
import EventCard from "../../components/EventCard";

const { width } = Dimensions.get("window");

const Events = () => {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
        <Image
          source={icons.logo}
          style={{ width: 120, height: 50 }}
          contentFit="cover"
        />
        <CustomButtonWithIcon
          icon={icons.filter}
          iconWidth={24}
          iconHeight={24}
          iconColor="#777777"
          containerStyles="w-[50px] h-[50px] items-start"
          isOutline={true}
        />
      </View>

      {/* Banner Carousel */}
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "flex-center",
        }}
      >
        <View>
          <Carousel
            loop
            width={width}
            height={200}
            autoPlay={true}
            autoPlayInterval={7000}
            data={EventBanners}
            scrollAnimationDuration={800}
            // onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View className="px-4">
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  {/* Image Background */}
                  <ImageBackground
                    source={{ uri: item.image }}
                    contentFit="cover"
                    style={{ width: "100%", height: 200 }}
                    imageStyle={{ borderRadius: 25 }}
                  >
                    {/* Gradient Overlay */}
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        justifyContent: "flex-end",
                        padding: 16,
                      }}
                    >
                      <View className="flex-row justify-between items-end">
                        <View className="">
                          <Text className="text-white text-lg font-poppins-semibold">
                            {item.title}
                          </Text>
                          <Text className="text-white text-sm font-poppins-regular mt-1">
                            {item.subtitle}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="bg-white rounded-full justify-center items-center"
                          style={{ height: 32, paddingHorizontal: 10 }}
                        >
                          <Text className="font-poppins-semibold text-sm text-black">
                            Try Now!
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </View>
              </View>
            )}
          />
        </View>

        {/* Search */}
        <View className="w-full px-4 mt-4">
          <InputField placeholder="Search Events" isDarkMode />
        </View>

        {/* ✅ Tabs with TabButtonSection */}
        <TabButtonSection
          selectedValue={activeTab}
          options={EventTabs}
          onChange={setActiveTab}
        />

        {/* Event List */}
        <View>
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;
