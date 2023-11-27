import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FoodContext } from "../App";
import FoodCard from "../components/foodCard";
import { BigRectangleButton } from "../components/bigRectangleButton";
import { Footer } from "../components/footer";


export default function Home() {
  const navigation = useNavigation();
  const { allFood, setAllFood } = useContext(FoodContext);

  biteOTD = allFood.filter((item) => 'biteOTD' in item && item.biteOTD === "T")[0];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.biteOTD}>
            <Text style={styles.biteText}>Byte of the Day</Text>
          </View>

          <FoodCard key={biteOTD.foodId} food={biteOTD} />

          <View style={styles.buttonsContainer}>
            <BigRectangleButton
              text="Browse Reviews"
              onClick={() => navigation.navigate("Choose Hall")}
            />
            <BigRectangleButton
              text="Leave A Review"
              onClick={() => navigation.navigate("Leave Review")}
            />
          </View>
        </ScrollView>
      </View>
      <Footer
        leftButtonText={"Back"}
        leftButtonPress={() => navigation.pop()}
        iconButtonPress={() => navigation.navigate("Navigation")}
        rightButtonText={"Review"}
        rightButtonPress={() => navigation.navigate("Leave Review")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B30738",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    alignSelf: "center",
    marginBottom: 50,
  },
  biteOTD: {
    paddingTop: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  biteText: {
    fontFamily: "Bungee",
    fontSize: 32,
    color: "white",
  },
});
