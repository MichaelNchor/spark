import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const PhoneNumberInput = ({
  defaultCountry = "GH",
  defaultCallingCode = "233",
  value,                 // full E.164, e.g. "+233501234567" or ""
  onChange,              // called with full E.164
  onValidityChange,      // (optional) called with boolean
  locked = true,
  minDigits = 9,         // ✅ minimum national digits required
  touched = false,       // track if user has interacted
  onTouched,             // callback when user first interacts
  showError = false,     // whether to show validation error
}) => {
  const [countryCode] = useState(defaultCountry);
  const [callingCode] = useState(defaultCallingCode);

  const deriveNational = (v) => {
    if (!v) return "";
    const stripped = v.replace(new RegExp(`^\\+?${callingCode}`), "");
    return stripped.replace(/\D/g, "");
  };

  const [nationalNumber, setNationalNumber] = useState(deriveNational(value));

  useEffect(() => {
    setNationalNumber(deriveNational(value));
  }, [value]);

  const fullPhone = useMemo(
    () => `+${callingCode}${nationalNumber}`,
    [callingCode, nationalNumber]
  );

  const isValid = useMemo(
    () => nationalNumber.length >= minDigits && nationalNumber.length <= 15,
    [nationalNumber, minDigits]
  );

  // notify parent when validity changes
  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleChangeText = (txt) => {
    const digits = txt.replace(/\D/g, "");
    setNationalNumber(digits);
    onChange?.(`+${callingCode}${digits}`); // parent decides when to submit

    // Mark as touched on first interaction
    if (!touched && txt.length > 0) {
      onTouched?.(true);
    }
  };

  return (
    <View className="w-full">
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
            visible={false}
            onSelect={() => {}}
          />
          <Text className="font-poppins-medium text-base text-gray-900">
            +{callingCode}
          </Text>
        </TouchableOpacity>

        <TextInput
          value={nationalNumber}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          placeholder={`Phone number (min ${minDigits} digits)`}
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
          onBlur={() => onTouched?.(true)}
        />
      </View>
      {showError && (
        <Text className="mt-2 text-sm text-red-500 font-poppins-regular">
          Enter a valid phone number (min {minDigits} digits)
        </Text>
      )}
    </View>
  );
};

export default PhoneNumberInput;
