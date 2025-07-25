import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const VerificationInput = ({ length = 4, onComplete }) => {
  const [digits, setDigits] = useState([]);

  const handleDigitPress = (digit) => {
    if (digits.length < length) {
      const newDigits = [...digits, digit];
      setDigits(newDigits);

      if (newDigits.length === length && onComplete) {
        onComplete(newDigits.join(""));
      }
    }
  };

  const handleDelete = () => {
    if (digits.length > 0) {
      setDigits(digits.slice(0, -1));
    }
  };

  const renderDigitBox = (digit, index) => {
    const isFilled = index < digits.length;
    const isActive = index === digits.length;

    let bg = "bg-transparent";
    let border = "border-[#E5E7EB]";
    let textColor = "text-black";

    if (isFilled) {
      bg = "bg-[#F43F5E]";
      border = "border-[#F43F5E]";
      textColor = "text-white";
    } else if (isActive) {
      border = "border-[#F43F5E]";
    }

    return (
      <View
        key={index}
        className={`w-20 h-20 rounded-3xl border ${border} ${bg} justify-center items-center`}
      >
        <Text className={`text-2xl font-poppins-medium ${textColor}`}>
          {isFilled ? digits[index] : ""}
        </Text>
      </View>
    );
  };

  const KeypadButton = ({ label, onPress, disabled }) => {
    const [pressed, setPressed] = useState(false);

    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={disabled}
        activeOpacity={0.7}
        className={`w-20 h-20 justify-center items-center rounded-3xl ${
          pressed ? "bg-gray-300" : "bg-transparent"
        }`}
      >
        <Text className="text-2xl text-black font-poppins-medium">{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full">
      <View className="flex-row justify-between w-full mb-8">
        {Array.from({ length }).map((_, index) =>
          renderDigitBox(digits[index], index)
        )}
      </View>

      <View className="space-y-4 gap-4 mt-12">
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
        ].map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between">
            {row.map((num) => (
              <KeypadButton
                key={num}
                label={num}
                onPress={() => handleDigitPress(num)}
              />
            ))}
          </View>
        ))}
        <View className="flex-row justify-between">
          <KeypadButton label="" onPress={() => {}} disabled />
          <KeypadButton label="0" onPress={() => handleDigitPress("0")} />
          <KeypadButton label="⌫" onPress={handleDelete} />
        </View>
      </View>
      <View>
        <Link
          href={"/profile-details"}
          className="font-poppins-semibold text-primary text-base text-center mt-12"
        >
          Send again
        </Link>
      </View>
    </View>
  );
};

export default VerificationInput;
