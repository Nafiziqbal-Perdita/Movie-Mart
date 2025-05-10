import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#4dabf7',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View className="justify-center items-center gap-2 flex-1 rounded-lg">
                <Entypo name="home" size={24} color={focused ? '#4dabf7' : '#666'} />
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View className="justify-center items-center gap-2 flex-1 rounded-lg">
                <FontAwesome name="search" size={24} color={focused ? '#4dabf7' : '#666'} />
              </View>
            </>
          ),
        }}
      />

      {/* <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View className="justify-center items-center gap-2 flex-1 rounded-lg">
                <MaterialCommunityIcons
                  name="content-save"
                  size={24}
                  color={focused ? '#4dabf7' : '#666'}
                />
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <View className="justify-center items-center gap-2 flex-1 rounded-lg">
                <FontAwesome6
                  name="person-circle-exclamation"
                  size={24}
                  color={focused ? '#4dabf7' : '#666'}
                />
              </View>
            </>
          ),
        }}
      /> */}
    </Tabs>
  );
};

export default TabsLayout;
