import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "../assets/constants";
import { Image } from "expo-image";

const ChatSendModal = () => {
  return (
    <View>
      <TouchableOpacity className="flex-row items-center mb-4">
        <Image
          source={icons.camera}
          style={{
            width: 36,
            height: 36,
          }}
          className="items-center justify-center"
        />
        <Text className="text-white ml-3 text-base font-poppins-regular">Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center mb-4">
        <Image
          source={icons.gallery}
          style={{
            width: 34,
            height: 34,
          }}
          className="items-center justify-center"
        />
        <Text className="text-white ml-3 text-base font-poppins-regular">Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatSendModal;
