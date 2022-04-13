import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
  useColorScheme,
} from 'react-native';

export const CustomFlatList = props => {
  const {
    emptyText = 'No items to show',
    emptyTextContainerStyle,
    emptyTextStyle,
    footerLoader,
    footerLoaderStyle,
    footerLoadingIndicator = {
      color: 'black',
      size: 'small',
    },
    ...otherProps
  } = props;

  const height = Dimensions.get('window').height;
  const colorScheme = useColorScheme();

  const listEmptyComponent = () => {
    return (
      <View
        style={[
          styles.emptyTextContainer,
          {
            height: height * 0.7,
          },
          emptyTextContainerStyle,
        ]}>
        <Text
          style={[
            styles.emptyText,
            // eslint-disable-next-line react-native/no-inline-styles
            {color: colorScheme === 'dark' ? 'white' : 'black'},
            emptyTextStyle,
          ]}>
          {emptyText}
        </Text>
      </View>
    );
  };

  const footerComponent = () => {
    if (footerLoader) {
      return (
        <View style={[styles.footerContainer, footerLoaderStyle]}>
          <ActivityIndicator
            color={footerLoadingIndicator.color}
            size={footerLoadingIndicator.size}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      initialNumToRender={25}
      ListFooterComponent={() => footerComponent()}
      ListEmptyComponent={() => listEmptyComponent()}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      decelerationRate="normal"
      onEndReachedThreshold={0.9}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  emptyTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  footerContainer: {
    paddingVertical: '4%',
    justifyContent: 'center',
  },
});
