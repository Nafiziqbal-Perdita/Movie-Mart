import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../Components/MovieCard";
import SearchBar from "../Components/SearchBar";
import TopBar from "../Components/TopBar";
import { fetchMovies, updateTrendingMovies } from "../Services/Api";
import useFetch from "../Services/useFetch";

const search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hasUpdatedRef = useRef(false);

  const {
    data: movieList,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery, page: currentPage }), false);

  useEffect(() => {
    // console.log("Search query changed:", searchQuery);
    
    const timeOut = setTimeout(async () => {
      if (searchQuery.trim()) {
        // console.log("Fetching movies for query:", searchQuery);
        setCurrentPage(1); // Reset to first page on new search
        await refetch();
        hasUpdatedRef.current = false; // Reset the flag when new search is made
      } else {
        // console.log("Empty search query, resetting");
        reset();
        hasUpdatedRef.current = false;
      }
    }, 300);

    return () => clearTimeout(timeOut);
  }, [searchQuery]);

  const handlePageChange = async (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    await refetch();
  };

  // Separate effect for handling trending movies update
  useEffect(() => {
    const updateTrending = async () => {
      if (movieList?.results?.length > 0 && !hasUpdatedRef.current) {
        const firstMovie = movieList.results[0];
        // console.log("Found movie to update trending:", firstMovie);
        try {
          await updateTrendingMovies(firstMovie);
          // console.log("Successfully updated trending movies");
          hasUpdatedRef.current = true; // Set flag after successful update
        } catch (error) {
          console.error("Error updating trending movies:", error);
          throw error;
        }
      }
    };

    updateTrending();
  }, [movieList]);

  return (
    <SafeAreaView className="bg-[#1a1a1a] flex-1">
      <View className="p-4 bg-[#1a1a1a]">
        <TopBar />
        
        {error ? (
          <Text className="text-white text-center mt-10">Error: {error?.message}</Text>
        ) : (
          <>
            <SearchBar
              value={searchQuery}
              setSearchQuery={setSearchQuery}
              onPressIn={() => router.push("/search")}
            />

            <View className="mt-2">
              <Text className="text-white text-lg font-bold">Search Results</Text>
            </View>

            <FlatList
              data={movieList?.results}
              key={currentPage}
              ListFooterComponent={() => {
                if (!movieList?.results?.length) return null;
                
                return (
                  <View key="pagination" className="flex-row justify-between items-center mt-6 mb-4 px-4">
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
                paddingBottom: 30
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default search;
