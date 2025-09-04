// components/LoveNoteCard.js
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const BRAND_GRADIENT = ["#fd297b", "#ff5864", "#ff655b"];

const LoveNoteCard = ({ onSend }) => {
  const [note, setNote] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const borderIdle = "rgba(255,255,255,0.3)";
  const borderFocus = "#FFFFFF";

  const handleSend = () => {
    if (note.trim() && onSend) {
      onSend(note);
      setNote("");
    }
  };

  return (
    <LinearGradient
      colors={BRAND_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 20,
        marginTop: 8,
      }}
    >
      <Text className="text-white text-sm font-poppins-semibold mb-3">
        Send a love note
      </Text>
      <Text className="text-white text-sm font-poppins-regular mb-3">
        👉💖 Send a special message before matching to stand out.
      </Text>

      {/* Input + Send button */}
      <View
        className="flex-row items-center px-3 rounded-full border"
        style={{
          borderColor: isFocused ? borderFocus : borderIdle,
          backgroundColor: isFocused ? "transparent" : "rgba(255,255,255,0.15)",
          shadowColor: "#000",
          shadowOpacity: isFocused ? 0.15 : 0,
          shadowRadius: isFocused ? 6 : 0,
          shadowOffset: { width: 0, height: isFocused ? 3 : 0 },
          elevation: isFocused ? 3 : 0,
          height: 48
        }}
      >
        <TextInput
          className="flex-1 font-poppins-regular text-base h-full px-2"
          placeholder="Your message"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={note}
          onChangeText={setNote}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: "#fff" }}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />

        {/* Send button */}
        <TouchableOpacity
          onPress={handleSend}
          activeOpacity={0.85}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <LinearGradient
            colors={BRAND_GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="paper-plane" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoveNoteCard;
