import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../config";
import { useNavigation } from "@react-navigation/native";

export default function Detail({ route }) {
  const tasksRef = firebase.firestore().collection("task");
  const [textHeading, onChangeText] = useState(route.params.item.name);
  const navigation = useNavigation();

  const updateTask = () => {
    if (textHeading && textHeading.length > 0) {
      tasksRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onChangeText}
        value={textHeading}
        placeholder="Update Task"
      />
      <TouchableOpacity
        style={styles.buttonUpdate}
        onPress={() => {
          updateTask();
        }}
      >
        <Text>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 15,
  },
  textField: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "e0e0e0",
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 10,
    backgroundColor: "#0de065",
  },
});
