import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export const GifView = ({item}) => {
  let thumbnailAnimated = new Animated.Value(0);
  let imageAnimated = new Animated.Value(0);

  const onThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.parallel([
      Animated.timing(thumbnailAnimated, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnimated, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri: item.images.original_still.url}}
        onLoad={onThumbnailLoad}
        style={[
          {
            height: Number(item.images.downsized_still.height),
            opacity: thumbnailAnimated,
          },
          styles.image,
        ]}
      />
      <Animated.Image
        source={{uri: item.images.original.url}}
        onLoad={onImageLoad}
        style={[
          {
            height: Number(item.images.downsized_still.height),
            opacity: imageAnimated,
          },
          styles.image,
          styles.imageOverlay,
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
    backgroundColor: '#e1e4e8',
  },
  image: {
    width: '96%',
    resizeMode: 'stretch',
    borderRadius: 10,
    alignSelf: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    left: '2%',
    right: '2%',
    bottom: '2%',
    top: '2%',
  },
});
