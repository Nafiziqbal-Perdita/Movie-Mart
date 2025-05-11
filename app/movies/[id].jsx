import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { fetchMovieDetails, fetchMovieVideo } from '../Services/Api';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [response, videoResponse] = await Promise.all([
          fetchMovieDetails({ movie_id: id }),
          fetchMovieVideo({ movie_id: id })
        ]);
        setMovie(response);
        // Find the first trailer video
        const trailer = videoResponse?.results?.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideo(trailer);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTrailerPress = async () => {
    if (video?.key) {
      const url = `https://www.youtube.com/watch?v=${video.key}`;
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("Cannot open URL: " + url);
        }
      } catch (error) {
        console.error("Error opening URL:", error);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#1a1a1a]">
        <ActivityIndicator size="large" color="#4dabf7" className="mt-10" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#1a1a1a]">
        <Text className="text-white text-center mt-10">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!movie) return null;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).getFullYear();
    } catch (e) {
      return "N/A";
    }
  };

  const formatBudget = (budget) => {
    if (!budget) return "N/A";
    return `$${budget.toLocaleString()}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      <ScrollView className="flex-1">
        {/* Backdrop Image */}
        <View className="relative h-96">
          <Image
            source={{
              uri: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/50" />
        </View>

        {/* Movie Info */}
        <View className="px-4 -mt-10">
          {/* Poster and Basic Info */}
          <View className="flex-row">
            <Image
              source={{
                uri: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
              }}
              className="w-32 h-48 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-white text-2xl font-bold" numberOfLines={2}>
                {movie.title || "Untitled"}
              </Text>
              <Text className="text-gray-400 mt-1">
                {formatDate(movie.release_date)}
              </Text>
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text className="text-white ml-1">
                  {movie.vote_average?.toFixed(1) || "N/A"} ({movie.vote_count || 0} votes)
                </Text>
              </View>
              <View className="flex-row flex-wrap mt-2">
                {movie.genres?.map((genre) => (
                  <View
                    key={genre.id}
                    className="bg-[#2a2a2a] px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-gray-300 text-xs">{genre.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Overview and Trailer Button */}
          <View className="mt-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-xl font-bold">Overview</Text>
              {video?.key && (
                <TouchableOpacity
                  onPress={handleTrailerPress}
                  className="bg-red-600 px-4 py-2 rounded-full flex-row items-center"
                >
                  <MaterialIcons name="play-circle-filled" size={20} color="white" />
                  <Text className="text-white font-semibold ml-1">Watch Trailer</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="text-gray-300 leading-6">
              {movie.overview || "No overview available."}
            </Text>
          </View>

          {/* Additional Info */}
          <View className="mt-6 space-y-4">
            <View>
              <Text className="text-white text-xl font-bold mb-2">Details</Text>
              <View className="bg-[#2a2a2a] p-4 rounded-lg">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-400">Runtime</Text>
                  <Text className="text-white">{movie.runtime || "N/A"} minutes</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-400">Language</Text>
                  <Text className="text-white">
                    {movie.spoken_languages?.map((lang) => lang.name).join(", ") || "N/A"}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-400">Status</Text>
                  <Text className="text-white">{movie.status || "N/A"}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-400">Budget</Text>
                  <Text className="text-white">{formatBudget(movie.budget)}</Text>
                </View>
              </View>
            </View>

            {/* Production Companies */}
            {movie.production_companies?.length > 0 && (
              <View>
                <Text className="text-white text-xl font-bold mb-2">
                  Production Companies
                </Text>
                <View className="bg-[#2a2a2a] p-4 rounded-lg">
                  {movie.production_companies.map((company) => (
                    <Text key={company.id} className="text-white mb-1">
                      • {company.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;