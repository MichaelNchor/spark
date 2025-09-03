import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import icons from "../assets/constants";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const EventCard = ({ event }) => {
  const members = [
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/36.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg",
  ];
  const visible = members.slice(0, 3);
  const extra = members.length - visible.length;

  return (
    <View
      className="mx-2 mb-4 overflow-hidden"
      style={{
        borderRadius: 32,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#EAEAEA",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
        padding: 2,
      }}
    >
      {/* IMAGE + OVERLAYS */}
      <View style={{ position: "relative" }}>
        <Image
          source={
            typeof event.image === "string" ? { uri: event.image } : event.image
          }
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            borderRadius: 32,
          }}
          contentFit="cover"
        />

        {/* Bottom fade to help text/pills pop */}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.35)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 110,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        />

        {/* Location pill (top-left) */}
        <View style={{ position: "absolute", left: 14, top: 14 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.55)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <Image
              source={icons.location}
              style={{
                width: 14,
                height: 14,
                tintColor: "#fff",
                marginRight: 6,
              }}
              contentFit="contain"
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontFamily: "Poppins-Medium",
              }}
              numberOfLines={1}
            >
              {event.location}
            </Text>
          </View>
        </View>

        {/* Date chip (top-right) */}
        <View style={{ position: "absolute", top: 14, right: 14 }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.55)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <Text
              style={{
                color: "#F3F4F6",
                fontSize: 12,
                fontFamily: "Poppins-Medium",
              }}
              numberOfLines={1}
            >
              {event.date}
            </Text>
          </View>
        </View>

        {/* Glass title bar (bottom) */}
        <View style={{ position: "absolute", left: 12, right: 12, bottom: 12 }}>
          <BlurView
            intensity={60}
            tint="dark"
            style={{
              borderRadius: 40,
              overflow: "hidden",
              paddingHorizontal: 16,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(255,255,255,0.10)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
            }}
          >
            <View style={{ flexShrink: 1, paddingRight: 12 }}>
              <Text
                className="font-poppins-semibold"
                style={{ color: "#fff", fontSize: 18 }}
                numberOfLines={1}
              >
                {event.title}
              </Text>
              {!!event.description && (
                <Text
                  className="font-poppins-regular"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 13,
                  }}
                  numberOfLines={1}
                >
                  {event.description}
                </Text>
              )}
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 9999,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.22)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.28)",
              }}
            >
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#fff"
                className="rotate-[320deg]"
              />
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>

      {/* BODY */}
      <View className="px-4 py-2">
        <View className="flex-row justify-between items-center">
          {/* Avatars */}
          <View className="flex-row items-center">
            {visible.map((uri, i) => (
              <View
                key={i}
                className="rounded-full overflow-hidden"
                style={{
                  width: 32,
                  height: 32,
                  marginLeft: i === 0 ? 0 : -10,
                  borderWidth: 2,
                  borderColor: "#fff", // clean ring on white card
                  backgroundColor: "#ddd",
                  borderRadius: 16,
                }}
              >
                <Image
                  source={{ uri }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            ))}
            {extra > 0 && (
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: -10,
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: "#F3F4F6",
                }}
              >
                <Text
                  className="font-poppins-semibold"
                  style={{ color: "#111827", fontSize: 12 }}
                >
                  +{extra}
                </Text>
              </View>
            )}
          </View>

          {/* Time pill */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
            <LinearGradient
              colors={["#fd297b", "#ff5864", "#ff655b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingVertical: 9,
                paddingHorizontal: 16,
                borderRadius: 9999,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
              }}
            >
              <Text
                className="font-poppins-semibold"
                style={{ color: "#fff", fontSize: 14 }}
              >
                {event.time}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
