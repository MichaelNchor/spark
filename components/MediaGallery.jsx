import React, { useState } from "react";
import { View, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
// import { Video } from "expo-av";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
          borderTopRightRadius: 15
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

      {/* Progress bar */}
      <View className="absolute flex w-full px-6 h-8 justify-center items-center rounded-3xl flex-row gap-1">
        {media.map((_, i) => (
          <Pressable
            key={i}
            onPress={() => setActiveIndex(i)}
            className={`h-[5px] flex-1 rounded-full border-[0.5px] border-gray-500/50 ${
              i === activeIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </View>
    </Pressable>
  );
};

export default MediaGallery;
