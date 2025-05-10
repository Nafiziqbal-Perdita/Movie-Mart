import { View, Text } from "react-native";
import React from "react";

const TopBar = () => {
  return (
    <View>
      <View className="items-center mb-5 mt-2.5">
        <Text className="text-3xl font-bold text-[#4dabf7]">🎬 MovieMart</Text>
      </View>
    </View>
  );
};

export default TopBar;
