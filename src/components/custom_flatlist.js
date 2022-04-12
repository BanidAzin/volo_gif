import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
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

  const listEmptyComponent = () => {
    return (
      <View
        style={[
          styles.emptyTextContainer,
          {
            height: height * 0.8,
          },
          emptyTextContainerStyle,
        ]}>
        <Text style={[styles.emptyText, emptyTextStyle]}>{emptyText}</Text>
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
      keyExtractor={item => `${item}`}
      ListFooterComponent={() => footerComponent()}
      ListEmptyComponent={() => listEmptyComponent()}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      decelerationRate="normal"
      //   contentContainerStyle={{paddingBottom: insets.bottom}}
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
