import React, { useState } from "react";
import { View, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
// import { Video } from "expo-av";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// put near the top of the file
const SPARK_GRADIENT = ["#fd297b", "#ff5864", "#ff655b"]; // your theme
const DOT = 6;          // inactive dot size
const PILL_W = 24;      // active pill width
const PILL_H = 6;       // active pill height
const GAP = 6;          // spacing between dots

const MediaGallery = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTap = (event) => {
    const tapX = event.nativeEvent.locationX;
    if (tapX > screenWidth / 2) {
      // Right tap
      setActiveIndex((prev) => (prev < media.length - 1 ? prev + 1 : prev));
    } else {
      // Left tap
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const activeItem = media[activeIndex];

  return (
    <Pressable className="flex-1" onPress={handleTap}>
      {/* Media Renderer */}
      {/* {activeItem.type === "image" ? ( */}
      <Image
        key={activeIndex}
        source={{ uri: activeItem.uri }}
        contentFit="cover"
        style={{
          height: screenHeight - 200,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      {/* ) : (
        <Video
          key={activeIndex}
          source={{ uri: activeItem.uri }}
          style={{ height: "100%", borderRadius: 30 }}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
      )} */}

      {/* Top Progress (pill + dots) */}
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          // optional: uncomment for a subtle glass chip behind the dots
          // paddingVertical: 6,
          // paddingHorizontal: 10,
          // backgroundColor: "rgba(0,0,0,0.25)",
          // borderRadius: 12,
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: GAP,
          }}
        >
          {media.map((_, i) => {
            const isActive = i === activeIndex;

            if (isActive) {
              // gradient pill for the active item
              return (
                <Pressable key={i} onPress={() => setActiveIndex(i)}>
                  <LinearGradient
                    colors={SPARK_GRADIENT}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: PILL_W,
                      height: PILL_H,
                      borderRadius: PILL_H / 2,
                      shadowColor: "#000",
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                      elevation: 2,
                    }}
                  />
                </Pressable>
              );
            }

            // inactive dots
            return (
              <Pressable key={i} onPress={() => setActiveIndex(i)}>
                <View
                  style={{
                    width: DOT,
                    height: DOT,
                    borderRadius: DOT / 2,
                    backgroundColor: "rgba(255,255,255,0.85)",
                  }}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

export default MediaGallery;
