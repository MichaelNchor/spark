// app/index.js
import React, { useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const SPARK = ["#fd297b", "#ff5864", "#ff655b"];
const { height } = Dimensions.get("window");

const BUTTON_H = 40;
const LABEL_SIZE = 15;

// tiny gradient chip used inside headline
const Chip = ({ children }) => (
  <LinearGradient
    colors={SPARK}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 10,
      marginHorizontal: 2,
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 28,
        lineHeight: 28,
        fontFamily: "Poppins-SemiBold",
      }}
    >
      {children}
    </Text>
  </LinearGradient>
);

export default function App() {
  const STEPS = useMemo(
    () => [
      {
        id: 0,
        title: (
          <Text
            style={{
              fontSize: 34,
              lineHeight: 45,
              color: "#fff",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Find Your <Chip>First</Chip> <Chip>Perfect</Chip> Matches
          </Text>
        ),
        subtitle: "Join us and connect with millions of like-minded souls.",
        image:
          "https://images.unsplash.com/photo-1684940888947-f69378f75c3b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 1,
        title: (
          <Text
            style={{
              fontSize: 34,
              lineHeight: 45,
              color: "#fff",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Smart <Chip>Matching</Chip> & Real Connections
          </Text>
        ),
        subtitle:
          "Our spark engine learns what you like to surface better profiles.",
        image:
          "https://images.unsplash.com/photo-1522941471521-6ee21ec5cc26?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        title: (
          <Text
            style={{
              fontSize: 34,
              lineHeight: 45,
              color: "#fff",
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Chat <Chip>Safely</Chip>, Meet <Chip>Nearby</Chip>
          </Text>
        ),
        subtitle: "Verified profiles and controls that put you first.",
        image:
          "https://images.unsplash.com/photo-1499372076272-6b5c2d2bb391?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  const animateTo = (next) => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setStep(next);
      Animated.timing(fade, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }).start();
    });
  };

  const goNext = () => {
    if (step < STEPS.length - 1) animateTo(step + 1);
    else router.push("/signup");
  };

  const goPrev = () => {
    if (step > 0) animateTo(step - 1);
  };

  const current = STEPS[step];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Background photo */}
      <View style={{ position: "absolute", inset: 0 }}>
        <Animated.View style={{ opacity: fade }}>
          <Image
            source={{ uri: current.image }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={320}
          />
        </Animated.View>

        <LinearGradient
          colors={[
            "rgba(0,0,0,0.10)", // top
            "rgba(0,0,0,0.25)",
            "rgba(0,0,0,0.45)", // mid
            "rgba(0,0,0,0.55)", // lower
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: "absolute", inset: 0 }}
        />
        {/* brand tint near bottom */}
        <LinearGradient
          colors={[
            "transparent",
            "rgba(253,41,123,0.25)",
            "rgba(255,88,100,0.28)",
            "rgba(255,101,91,0.35)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: "absolute", inset: 0 }}
        />
      </View>

      {/* CONTENT (anchored lower like modern onboarding) */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "flex-end",
          paddingBottom: 18,
          gap: 12,
        }}
      >
        {/* Logo */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins-SemiBold",
              fontSize: 24,
              marginLeft: 4,
              opacity: 0.95,
            }}
          >
            Spark
          </Text>
        </View>

        {/* Headline + copy */}
        {current.title}
        <Text
          style={{
            marginTop: 10,
            color: "rgba(255,255,255,0.92)",
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 16,
          }}
        >
          {current.subtitle}
        </Text>

        {/* Step dots */}
        <View style={{ flexDirection: "row", marginBottom: 14 }}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step ? 18 : 8,
                height: 8,
                borderRadius: 999,
                marginRight: 6,
                backgroundColor:
                  i === step ? "#FFFFFF" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </View>

        {/* Controls row */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Previous */}
          {step > 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={goPrev}
              style={{
                height: BUTTON_H,
                minWidth: 128,
                paddingHorizontal: 16,
                borderRadius: 999,
                backgroundColor: "#fff",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center", // <-- key
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Ionicons
                  name="chevron-back"
                  size={18}
                  color="#000"
                  style={{ transform: [{ translateY: 0.5 }] }} // tiny visual nudge
                />
                <Text
                  style={{
                    color: "#000",
                    fontFamily: "Poppins-Medium",
                    fontSize: LABEL_SIZE,
                    lineHeight: LABEL_SIZE, // <-- equal line-height
                    includeFontPadding: false, // <-- Android fix
                    textAlignVertical: "center", // <-- Android hint
                  }}
                >
                  Previous
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{ height: BUTTON_H, minWidth: 128 }} />
          )}

          <View style={{ flex: 1 }} />

          {/* Next / Get started */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={goNext}
            style={{
              height: BUTTON_H,
              minWidth: 128,
              paddingHorizontal: 22,
              borderRadius: 999,
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <LinearGradient
              colors={SPARK}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 999,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center", // <-- key
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Poppins-Medium",
                  fontSize: LABEL_SIZE,
                  lineHeight: LABEL_SIZE, // <-- equal line-height
                  includeFontPadding: false, // <-- Android fix
                  textAlignVertical: "center", // <-- Android hint
                }}
              >
                {step === STEPS.length - 1 ? "Get started" : "Next"}
              </Text>
              <Ionicons
                name={
                  step === STEPS.length - 1
                    ? "arrow-forward"
                    : "chevron-forward"
                }
                size={18}
                color="#fff"
                style={{ transform: [{ translateY: 0.5 }] }} // tiny visual nudge
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* bottom inset space (visual breathing) */}
        <View style={{ height: height * 0.035 }} />
      </View>
    </SafeAreaView>
  );
}
