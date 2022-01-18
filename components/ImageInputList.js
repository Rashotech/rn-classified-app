import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollview = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollview}
        horizontal
        onContentSizeChange={() => scrollview.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View style={styles.image} key={uri}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
    // flexWrap: 'wrap',
  },
  image: {
    marginRight: 10,
    //   paddingTop: 10
  },
});

export default ImageInputList;
