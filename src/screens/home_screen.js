import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';

import {CustomFlatList} from '../components/custom_flatlist';
import {GifView} from '../components/gif_view';
import {TRENDING_GIFS, fetchData, UNAUTHENTICATED} from '../utilities';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [footerLoader, setFooterLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trendingGifs, setTrendingGifs] = useState([]);

  useEffect(() => {
    getTrendingGifs({refresh: true});
  }, []);

  const getTrendingGifs = ({refresh = false}) => {
    let url = refresh
      ? TRENDING_GIFS
      : TRENDING_GIFS + '&offset=' + trendingGifs.length;

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

  const renderGifItem = ({item}) => {
    return <GifView key={`${item.id}`} item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
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
