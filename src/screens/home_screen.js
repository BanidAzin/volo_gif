import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import {CustomFlatList} from '../components/custom_flatlist';

export const HomeScreen = () => {
  const [footerLoader, setFooterLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  const onEndReached = () => {
    setFooterLoader(true);
    setTimeout(() => {
      setFooterLoader(false);
    }, 200);
  };

  const renderGifItem = ({item}) => {
    return (
      <View key={item}>
        <Text>Hello</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={[]}
        renderItem={renderGifItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        footerLoader={footerLoader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
