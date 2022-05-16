import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { firebase } from "../../config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function Home({ route }) {
  const [tasks, setTasks] = useState([]);
  const tasksRef = firebase.firestore().collection("task");
  const [addTasks, setAddTasks] = useState([""]);
  const navigation = useNavigation();

  useEffect(() => {
    tasksRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        const { heading } = doc.data();
        tasks.push({
          id: doc.id,
          heading,
        });
      });
      setTasks(tasks);
    });
  }, []);

  // delete task from firebase

  const deleteTask = (tasks) => {
    tasksRef
      .doc(tasks.id)
      .delete()
      .then(() => {
        alert("Success delete task");
      })
      .catch((error) => {
        alert(error);
      });
  };

  // add task from firebase
  const addTask = () => {
    if (addTasks && addTasks.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addTasks,
        createdAt: timestamp,
      };
      tasksRef
        .add(data)
        .then(() => {
          setAddTasks("");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Task's"
          placeholderTextColor="#FFFF"
          onChangeText={(heading) => setAddTasks(heading)}
          value={addTasks}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Pressable
              style={styles.containerPrees}
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <FontAwesome
                name="trash-o"
                color="orange"
                onPress={() => deleteTask(item)}
                style={styles.taskIcon}
              />

              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  formContainer: {
    justifyContent: "center",
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 70,
    fontWeight: "bold",
  },
  containerPrees: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  textInput: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "black",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  taskIcon: {
    marginTop: 5,
    fontSize: 20,
    marginLeft: 14,
  },
});
