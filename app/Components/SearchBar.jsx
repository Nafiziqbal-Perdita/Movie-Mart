import EvilIcons from '@expo/vector-icons/EvilIcons';
import React from 'react';
import { TextInput, View } from 'react-native';

const SearchBar = ({onPress, setSearchQuery, value}) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-start gap-2 mb-4">
        <EvilIcons name="search" size={24} color="white" />
        <TextInput
          onChangeText={setSearchQuery}
          value={value}
          placeholder="Search movies..."
          placeholderTextColor="#666"
          onPressIn={onPress}
          className="flex-1 text-base border border-[#333] rounded-full px-5 py-2.5 bg-[#262626] text-white shadow-sm"
        />
      </View>
    </View>
  )
}

export default SearchBar