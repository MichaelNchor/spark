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
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Events = () => {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
        <Image
          source={icons.logo}
          style={{ width: 80, height: 30 }}
          contentFit="cover"
        />
        <CustomButtonWithIcon
          icon={icons.notification}
          iconWidth={24}
          iconHeight={24}
          iconColor="black"
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
              <View className="px-2">
                <View className="rounded-2xl overflow-hidden shadow-lg">
                  {/* Image Background */}
                  <ImageBackground
                    source={{ uri: item.image }}
                    contentFit="cover"
                    style={{ width: "100%", height: 200 }}
                    imageStyle={{ borderRadius: 25 }}
                  >
                    <LinearGradient
                      colors={[
                        "transparent",
                        "rgba(0,0,0,0.45)",
                        "rgba(0,0,0,0.65)",
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 90,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                      }}
                    />

                    {/* Frosted bar */}
                    <View
                      style={{
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 12,
                      }}
                    >
                      <BlurView
                        intensity={55} // increase for more blur (e.g., 70–90)
                        tint="dark" // "light" | "dark" | "default"
                        style={{
                          borderRadius: 16,
                          overflow: "hidden",
                          paddingHorizontal: 14,
                          paddingVertical: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          // a little translucent fill + subtle border for glass effect
                          backgroundColor: "rgba(255,255,255,0.10)",
                          borderWidth: 1,
                          borderColor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <View style={{ flexShrink: 1, paddingRight: 12 }}>
                          <Text
                            className="text-white text-lg font-poppins-semibold"
                            numberOfLines={1}
                          >
                            {item.title}
                          </Text>
                          <Text
                            className="text-white/90 text-sm font-poppins-regular mt-1"
                            numberOfLines={1}
                          >
                            {item.subtitle}
                          </Text>
                        </View>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(255,255,255,0.18)", // frosted circle
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.25)",
                          }}
                        >
                          <Ionicons
                            name="arrow-forward"
                            size={18}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </BlurView>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            )}
          />
        </View>

        {/* Search */}
        <View className="w-full px-2 mt-4">
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
