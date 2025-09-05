import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const PhoneNumberInput = ({
  defaultCountry = "GH",
  defaultCallingCode = "233",
  value,
  onChange,
  locked = true, // true = Ghana locked, false = allow country change later
}) => {
  const [countryCode] = useState(defaultCountry);
  const [callingCode] = useState(defaultCallingCode);
  const [nationalNumber, setNationalNumber] = useState(value || "");

//   const fullPhone = useMemo(
//     () => `+${callingCode}${nationalNumber.replace(/\D/g, "")}`,
//     [callingCode, nationalNumber]
//   );

  const handleChangeText = (txt) => {
    const digits = txt.replace(/\D/g, "");
    setNationalNumber(digits);
    onChange?.(`+${callingCode}${digits}`);
  };

  return (
    <View
      className="flex-row items-center"
      style={{
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Country chip (locked by default) */}
      <TouchableOpacity
        activeOpacity={locked ? 1 : 0.7}
        disabled={locked}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          borderRightWidth: 1,
          borderRightColor: "#E5E7EB",
        }}
      >
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withEmoji
          withCallingCodeButton={false}
          visible={false} // list disabled
          onSelect={() => {}}
        />
        <Text className="font-poppins-medium text-base text-gray-900">+{callingCode}</Text>
      </TouchableOpacity>

      {/* National number input */}
      <TextInput
        value={nationalNumber}
        onChangeText={handleChangeText}
        keyboardType="phone-pad"
        placeholder="Phone number"
        placeholderTextColor="#9CA3AF"
        style={{
          flex: 1,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 16,
          color: "#111827",
          fontFamily: "Poppins-Regular",
        }}
        maxLength={15}
      />
    </View>
  );
};

export default PhoneNumberInput;
