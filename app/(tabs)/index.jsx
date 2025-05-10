import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../Components/MovieCard";
import TopBar from "../Components/TopBar";
import TrendingMovie from "../Components/TrendingMovie";
import { fetchMovies, updateTrendingMovies } from "../Services/Api";
import useFetch from "../Services/useFetch";

const index = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const trendingRef = useRef(true);

  const {
    data: movieList,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchMovies({ query: "", page: currentPage }));
 
  const {
    data: trendingMovieList,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending
  } = useFetch(() => updateTrendingMovies(), trendingRef.current);

  const handlePageChange = async (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    await refetch();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    trendingRef.current = false;
    try {
      setCurrentPage(1); // Reset to first page
      await Promise.all([refetch(), refetchTrending()]);
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
      trendingRef.current = true;
    }
  }, [refetch, refetchTrending]);

  return (
    <SafeAreaView className="bg-[#1a1a1a] flex-1">
      <View className="p-4 bg-[#1a1a1a] flex-1">
        <TopBar />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4dabf7"
            className="mt-10 self-center"
          />
        ) : error ? (
          <Text className="text-white text-center mt-10">Error: {error?.message}</Text>
        ) : (
          <FlatList
            data={movieList?.results}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#4dabf7"]}
                tintColor="#4dabf7"
              />
            }
            ListHeaderComponent={() => (
              <>
                <TouchableOpacity
                  onPress={() => router.push("/search")}
                  className="bg-[#2a2a2a] p-3 rounded-lg flex-row items-center border-b"
                >
                  <Text className="text-gray-400">🔍 Search movies...</Text>
                </TouchableOpacity>

                {/* Trending Movies Section */}
                {!trendingError && !trendingLoading && trendingMovieList && trendingMovieList.length > 0 && (
                  <View className="mt-6">
                    <Text className="text-red-500 text-lg font-bold mb-4">🔥 Trending Now!</Text>
                    <FlatList
                      data={trendingMovieList}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => <TrendingMovie item={item} />}
                      keyExtractor={(item) => item.id.toString()}
                      contentContainerStyle={{
                        paddingRight: 16,
                      }}
                    />
                  </View>
                )}

                <View className="mt-6">
                  <Text className="text-white text-lg font-bold mb-4">Popular Movies</Text>
                </View>
              </>
            )}
            ListFooterComponent={() => {
              if (loading || error || !movieList?.results?.length) return null;
              
              return (
                <View className="flex-row justify-between items-center mt-6 mb-4 px-4">
                  <TouchableOpacity
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex-row items-center px-4 py-2 rounded-full ${
                      currentPage === 1 ? 'bg-gray-600' : 'bg-blue-600'
                    }`}
                  >
                    <MaterialIcons name="arrow-back" size={20} color="white" />
                    <Text className="text-white ml-1">Previous</Text>
                  </TouchableOpacity>

                  <Text className="text-white">Page {currentPage}</Text>

                  <TouchableOpacity
                    onPress={() => handlePageChange(currentPage + 1)}
                    className="flex-row items-center px-4 py-2 rounded-full bg-blue-600"
                  >
                    <Text className="text-white mr-1">Next</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              );
            }}
            ItemSeparatorComponent={() => <View className="w-4" />}
            contentContainerStyle={{
              gap: 26,
              paddingBottom: 30,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              gap: 16,
            }}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MovieCard {...item} />}
            ListEmptyComponent={() => (
              <View className="mt-4">
                <Text className="text-white">No movies found</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default index;
