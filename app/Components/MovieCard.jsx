import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ id, poster_path, title, release_date, vote_average }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      onPress={() => router.push(`/movies/${id}`)}
      className="mt-4 flex-1"
    >
      <View className="w-full relative">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <View>
          <Text
            className="text-sm font-bold mt-2 text-white"
            numberOfLines={2}
          >
            {title}
          </Text>
          <View className="flex-row gap-2 items-center mt-1">
            <Text className="text-gray-400 text-sm">Release:</Text>
            <Text className="text-gray-400 text-sm">
              {release_date ? new Date(release_date).getFullYear() : "N/A"}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-400 text-sm">⭐</Text>
            <Text className="text-white text-sm ml-1">
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
