import { useRouter } from "expo-router";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingMovie = ({ item }) => {
  const router = useRouter();
  
  // Helper function to format rating
  const formatRating = (rating) => {
    if (!rating) return "N/A";
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "N/A" : numRating.toFixed(1);
  };
  
  return (
    <TouchableOpacity 
      onPress={() => router.push(`/movies/${item.movie_id}`)}
      className="mr-4 w-64"
    >
      <Image
        source={{
          uri: item.poster
            ? `https://image.tmdb.org/t/p/w500${item.poster}`
            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
        }}
        className="w-full h-80 rounded-lg"
        resizeMode="cover"
      />
      <View className="mt-2">
        <Text className="text-white font-bold text-lg" numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-400">⭐</Text>
          <Text className="text-white ml-1">
            {formatRating(item.rating)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingMovie;