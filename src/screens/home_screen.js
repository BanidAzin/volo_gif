import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  useColorScheme,
  StyleSheet,
} from 'react-native';

import {CustomFlatList, GifView, SearchBar} from '../components';
import {
  TRENDING_GIFS,
  SEARCH_GIFS,
  fetchData,
  UNAUTHENTICATED,
} from '../utilities';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [footerLoader, setFooterLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const colorScheme = useColorScheme();

  useEffect(() => {
    const handler = setTimeout(() => {
      getTrendingGifs({refresh: true});
    }, 300);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const getTrendingGifs = ({refresh = false}) => {
    let baseUrl =
      searchTerm.length === 0
        ? TRENDING_GIFS
        : SEARCH_GIFS + '&q=' + searchTerm;

    let url = refresh ? baseUrl : baseUrl + '&offset=' + trendingGifs.length;

    fetchData({
      url,
    })
      .then(response => {
        const list = refresh
          ? response.data ?? []
          : trendingGifs.concat(response.data ?? []);
        setTrendingGifs(list);
      })
      .catch(({errors, appStatus}) => {
        if (appStatus === UNAUTHENTICATED) {
          console.log(errors.message);
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setFooterLoader(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getTrendingGifs({refresh: true});
  };

  const onEndReached = () => {
    if (!footerLoader && !refreshing) {
      setFooterLoader(true);
      getTrendingGifs({});
    }
  };

  const onSearchTermChange = text => setSearchTerm(text);

  const renderGifItem = ({item}) => {
    return <GifView key={`${item.id}`} item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </View>
      ) : (
        <CustomFlatList
          data={trendingGifs}
          renderItem={renderGifItem}
          keyExtractor={(item, index) => `${item.id}${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          footerLoader={footerLoader}
          ListHeaderComponent={
            <SearchBar value={searchTerm} onChangeText={onSearchTermChange} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
