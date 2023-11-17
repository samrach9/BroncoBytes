import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { FoodContext } from "../App";
import { TopBar } from "../components/topBar";
import { Footer } from "../components/footer";
import putFood from "../api/putFood";
import { restaurants } from "../enum/restaurants";
import { tags } from "../enum/tags";
import { foodTypes } from "../enum/foodTypes";

export default function CreateFood() {
  const navigation = useNavigation();

  const { allFood, setAllFood } = useContext(FoodContext);
  const [foodName, setFoodName] = useState("");
  const [chosenRestaurants, setChosenRestaurants] = useState([]);
  const [foodType, setFoodType] = useState("");
  const [chosenTags, setChosenTags] = useState([]);
  const [sliceTagIndex, setSliceTagIndex] = useState(3);
  const [sliceRestaurantIndex, setSliceResaurantIndex] = useState(3);
  const [showingMoreTags, setShowingMoreTags] = useState(false);
  const [showingMoreRestaurants, setShowingMoreRestaurants] = useState(false);

  const submitFood = async () => {
    if (foodName == "") {
      alert("Please enter a food name");
      return;
    }

    if (chosenRestaurants == []) {
      alert("Please select at least one restaurant");
      return;
    }

    if (foodType == "") {
      alert("Please select a food type");
      return;
    }

    navigation.navigate("Loading");

    const food = {
      name: foodName,
      restaurants: chosenRestaurants,
      type: foodType,
      tags: chosenTags,
    };

    const foodId = await putFood(food);
    food.foodId = foodId;

    await setAllFood([...allFood, food]);

    navigation.navigate("Create Food");
    alert("Food Created!");
    resetState();
  };

  const resetState = () => {
    setFoodName("");
    setChosenRestaurants([]);
    setFoodType("");
    setChosenTags([]);
  };

  const handleTagPressed = (key) => () => {
    if (chosenTags.includes(key)) {
      setChosenTags(chosenTags.filter((item) => item != key));
    } else {
      setChosenTags([...chosenTags, key]);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar text={"Create a Food"} />
      <KeyboardAvoidingView style={styles.contentContainer} behavior="height">
        <Text style={styles.labelText}>Food Name</Text>
        <TextInput
          value={foodName}
          onChangeText={setFoodName}
          style={styles.titleInput}
          placeholder="Enter food name"
        />
        <View style={styles.tagsContainer}>
          <Text style={styles.labelText}>Restaurants</Text>
          <View style={styles.tagRowContent}>
            {Object.keys(restaurants).slice(0, !showingMoreRestaurants ? 3 : undefined).map((key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={{ marginVertical: 5 }}
                  onPress={() => {
                    if (chosenRestaurants.includes(key)) {
                      setChosenRestaurants(
                        chosenRestaurants.filter((item) => item != key)
                      );
                    } else {
                      setChosenRestaurants([...chosenRestaurants, key]);
                    }
                  }}
                >
                  <View
                    key={key}
                    style={
                      chosenRestaurants.includes(key)
                        ? styles.pressedTagButton
                        : styles.tagButton
                    }
                  >
                    <Text key={key} style={styles.tagText}>
                      {restaurants[key]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {showingMoreRestaurants ? (
              <TouchableOpacity
                onPress={() => {
                    setShowingMoreRestaurants(!showingMoreRestaurants);
                }}
              >
                <Text style={styles.moreTagsText}>- Less Restaurants</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                    setShowingMoreRestaurants(!showingMoreRestaurants);
                }}
              >
                <Text style={styles.moreTagsText}>+ More Restaurants</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.labelText}>Food Type</Text>
        <RNPickerSelect
          value={foodType}
          onValueChange={(value) => setFoodType(value)}
          items={Object.keys(foodTypes).map((key) => ({
            label: foodTypes[key],
            value: key,
          }))}
          style={pickerSelectStyles}
        />

        <View style={styles.tagsContainer}>
          <Text style={styles.labelText}>Tags</Text>
          <View style={styles.tagRowContent}>
            {Object.keys(tags)
              .slice(0, !showingMoreTags ? 3 : undefined)
              .map((key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={{ marginVertical: 5 }}
                    onPress={handleTagPressed(key)}
                  >
                    <View
                      key={key}
                      style={
                        chosenTags.includes(key)
                          ? styles.pressedTagButton
                          : styles.tagButton
                      }
                    >
                      <Text key={key} style={styles.tagText}>
                        {tags[key]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
          {showingMoreTags ? (
            <TouchableOpacity
              onPress={() => {
                setShowingMoreTags(!showingMoreTags);
              }}
            >
              <Text style={styles.moreTagsText}>- Less Tags</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setShowingMoreTags(!showingMoreTags);
              }}
            >
              <Text style={styles.moreTagsText}>+ More Tags</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      <Footer
        leftButtonText={"Back"}
        leftButtonPress={() => navigation.pop()}
        iconButtonPress={() => navigation.navigate("Navigation")}
        rightButtonText={"Submit"}
        rightButtonPress={() => submitFood()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B30738",
  },
  contentContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "top",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalContentContainer: {
    backgroundColor: "#B30738",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
  },
  titleInput: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
  },
  labelText: {
    fontFamily: "Bungee",
    fontSize: 16,
    color: "white",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  uploadButton: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  tagsContainer: {
    margin: 15,
    alignItems: "center",
  },
  tagRowContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagText: {
    fontFamily: "Bungee",
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  pressedTagText: {
    fontFamily: "Bungee",
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  tagButton: {
    marginHorizontal: 7,
    borderWidth: 4,
    borderRadius: 25,
    borderColor: "white",
    height: 40,
    width: 100,
    justifyContent: "center",
  },
  pressedTagButton: {
    marginHorizontal: 7,
    borderWidth: 4,
    borderRadius: 25,
    borderColor: "black",
    backgroundColor: "#850529",
    height: 40,
    width: 100,
    justifyContent: "center",
  },
  moreTagsText: {
    fontFamily: "Bungee",
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Bungee",
    textAlign: "center",
    alignSelf: "center",
  },
  inputAndroid: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 10,
  },
});
