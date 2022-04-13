import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const SearchBar = props => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search here..."
        placeholderTextColor="grey"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: '50%',
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e1e4e8',
  },
});
