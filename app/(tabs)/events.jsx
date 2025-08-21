import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButtonWithIcon from '../../components/CustomButtonWithIcon'
import { Image } from 'expo-image'
import icons from "../../assets/constants";

const events = () => {
  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      {/* Top bar */}
      <View className="w-full flex-row items-center justify-between px-4 pt-4 my-2">
        <Image
          source={icons.logo}
          style={{ width: 120, height: 50 }}
          contentFit="cover"
        />
        <CustomButtonWithIcon
          icon={icons.settings}
          iconWidth={32}
          iconHeight={32}
          iconColor="#777777"
          containerStyles="w-[50px] h-[50px] items-start"
          isOutline={true}
        />
      </View>
      </SafeAreaView>
  )
}

export default events