import { View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";

const SPARK = {
  gradient: ["#fd297b", "#ff5864", "#ff655b"], // your app gradient
  cardBg: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
};

const LikeCard = ({ user, height = 240, radius = 20, showMatch = true }) => {
  const {
    name,
    age,
    distance = user.location.distance,
    city,
    country,
    isVerified = true,
    isOnline = false,
    matchScore = 90, // 90%
  } = user;

  return (
    <View
      className="bg-white overflow-hidden"
      style={{
        height,
        borderRadius: radius,
        borderColor: SPARK.border,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
        backgroundColor: SPARK.cardBg,
      }}
    >
      {/* Photo */}
      <Image
        source={{ uri: user.media[0].uri }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />

      {/* Top-left: Match ribbon (from inspo) */}
      {showMatch && (
        <LinearGradient
          colors={SPARK.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 30,
          }}
        >
          <Text
            className="font-poppins-regular text-base"
            style={{
              color: "white",
            }}
          >
            {matchScore}% Match
          </Text>
        </LinearGradient>
      )}

      {/* Top-right: Star badge + online dot */}
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: "#3B82F6",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 6,
        }}
      >
        <Ionicons name="star" size={16} color="#fff" />
        {isOnline && (
          <View
            style={{
              position: "absolute",
              width: 9,
              height: 9,
              borderRadius: 5,
              backgroundColor: "#22c55e",
              borderWidth: 1.5,
              borderColor: "#fff",
              right: -1,
              top: -1,
            }}
          />
        )}
      </View>

      {/* Bottom overlay: gradient + glassy distance pill + name/loc */}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.75)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 12,
          paddingBottom: 12,
          paddingTop: 40,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
        }}
      >
        {/* Distance pill (inspo) */}
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "rgba(255,255,255,0.18)",
            borderColor: "rgba(255,255,255,0.45)",
            borderWidth: 0.3,
            paddingHorizontal: 10,
            paddingVertical: 1,
            borderRadius: 999,
            marginBottom: 6,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Image
            source={icons.location}
            style={{ width: 16, height: 25, tintColor: "white" }}
            contentFit="contain"
          />
          <Text
            className="font-poppins-medium text-xs"
            style={{ color: "#fff" }}
          >
            {typeof distance === "number"
              ? `${distance.toFixed(1)} km away`
              : distance}
          </Text>
        </View>

        {/* Name + verified + age */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text
            className="font-poppins-medium text-base"
            numberOfLines={1}
            style={{
              color: "#fff",
              flexShrink: 1,
            }}
          >
            {name}
            {age ? ` ${age}` : ""}
          </Text>
          {isVerified && (
            <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
          )}
        </View>

        {/* City, Country (small) */}
        {(city || country) && (
          <Text
            numberOfLines={1}
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 12,
              marginTop: 2,
              letterSpacing: 0.3,
            }}
          >
            {(city || "").toUpperCase()}
            {city && country ? ", " : ""}
            {(country || "").toUpperCase()}
          </Text>
        )}
      </LinearGradient>
    </View>
  );
};

export default LikeCard;
