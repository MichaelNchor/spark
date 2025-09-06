import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBox = ({
  value,
  placeholder = "Search",
  onChangeText,
  onSubmitEditing,
  otherStyles = "",
  containerStyle,             // <— NEW
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const bg = Platform.OS === "ios" ? "#F2F2F7" : "#F4F4F4";

  return (
    <View
      className={`flex-row items-center ${otherStyles}`}
      style={{
        width: "100%",          // <— ensure width
        alignSelf: "stretch",   // <— ensure it stretches in parents
        height: 44,
        borderRadius: 12,
        paddingHorizontal: 10,
        backgroundColor: bg,
        borderWidth: focused ? 1 : 0,
        borderColor: focused ? "#D1D5DB" : "transparent",
        ...containerStyle,      // <— allow caller overrides
      }}
    >
      <Ionicons
        name="search-outline"
        size={22}
        color="#000"
        style={{ marginRight: 3 }}
      />
      <TextInput
        style={{
          flex: 1,
          height: "100%",
          paddingVertical: 0,
          fontFamily: "Poppins-Regular",
          color: "#111",
          fontSize: 16,
          ...(Platform.OS === "android" ? { textAlignVertical: "center" } : null),
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
        clearButtonMode={Platform.OS === "ios" ? "while-editing" : "never"}
        {...props}
      />
      {Platform.OS !== "ios" && !!value && (
        <TouchableOpacity
          onPress={() => onChangeText && onChangeText("")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="close-circle" size={18} color="#C7C7CC" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;
