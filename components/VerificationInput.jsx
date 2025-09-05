import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

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

    if (isFilled) {
      return (
        <View key={index} className="w-20 h-20 rounded-3xl overflow-hidden">
          <LinearGradient
            colors={["#fd297b", "#ff5864", "#ff655b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-1 justify-center items-center"
          >
            <Text className="text-2xl font-poppins-medium text-white">
              {digits[index]}
            </Text>
          </LinearGradient>
        </View>
      );
    }

    return (
      <View
        key={index}
        className={`w-20 h-20 rounded-3xl border justify-center items-center ${
          isActive ? "border-[#fd297b]" : "border-gray-300"
        }`}
      >
        <Text className="text-2xl font-poppins-medium text-black">{""}</Text>
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
        className="w-20 h-20 rounded-3xl overflow-hidden"
      >
        {pressed ? (
          <LinearGradient
            colors={["#fd297b", "#ff5864", "#ff655b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-1 justify-center items-center"
          >
            <Text className="text-2xl text-white font-poppins-medium">
              {label}
            </Text>
          </LinearGradient>
        ) : (
          <View className="flex-1 justify-center items-center bg-transparent">
            <Text className="text-2xl text-black font-poppins-medium">
              {label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full flex-col justify-between gap-1">
      {/* Digit Boxes */}
      <View className="flex-row justify-between w-full">
        {Array.from({ length }).map((_, index) =>
          renderDigitBox(digits[index], index)
        )}
      </View>

      {/* Keypad */}
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

      {/* Resend */}
      <View>
        <TouchableOpacity onPress={() => router.push("/steps/profile-details")}>
          <Text className="font-poppins-medium text-primary text-sm text-center">
            Send again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationInput;
