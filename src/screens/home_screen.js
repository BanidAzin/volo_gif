import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {CustomFlatList} from '../components/custom_flatlist';
import {TRENDING_GIFS, fetchData, UNAUTHENTICATED} from '../utilities';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [footerLoader, setFooterLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trendingGifs, setTrendingGifs] = useState([]);

  useEffect(() => {
    getTrendingGifs();
  }, []);

  const getTrendingGifs = () => {
    fetchData({
      url: TRENDING_GIFS,
    })
      .then(response => {
        setTrendingGifs(response.data);
      })
      .catch(({errors, appStatus}) => {
        if (appStatus === UNAUTHENTICATED) {
          console.log(errors.message);
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  const onEndReached = () => {
    // setFooterLoader(true);
    // setTimeout(() => {
    //   setFooterLoader(false);
    // }, 200);
  };

  const renderGifItem = ({item}) => {
    return (
      <View key={`${item.id}`}>
        <Text>Hello</Text>
      </View>
    );
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
          keyExtractor={item => `${item.id}`}
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
