import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import CustomButtonWithIcon from '../../components/CustomButtonWithIcon'
import icons from "../../assets/constants";

const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
    {/* Logo & subtitle */}
    {/* Top bar with logo left, icons right */}
    <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
      {/* Logo on the left */}
      <Image
        source={icons.logo}
        style={{ width: 120, height: 50 }}
        contentFit="cover"
      />
      {/* Right icons */}
      <View className="flex-row items-center gap-3">
        <CustomButtonWithIcon
          icon={icons.settings}
          iconWidth={32}
          iconHeight={32}
          iconColor="#777777"
          // handlePress={() => setIsModalVisible(true)}
          containerStyles="w-[50px] h-[50px] items-start"
          isOutline={true}
        />
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Profile