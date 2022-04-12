import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const GifView = ({item}) => {
  console.log(item.id);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.images.downsized_still.url}}
        style={[
          {
            height: Number(item.images.downsized_still.height),
          },
          styles.image,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
    marginHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  image: {
    width: '96%',
    resizeMode: 'stretch',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
