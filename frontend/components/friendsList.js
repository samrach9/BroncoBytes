import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

export function FriendsList({ friends }) {

  const navigation = useNavigation();

  async function viewFriendReviews(friend) {
    navigation.navigate("Loading");
    const reviews = await getReviewsByUser(friend.userId);
    const reviewsWithUsername = reviews.map((review) => {
      return { ...review, user: friend };
    });
    const userFood = {
      foodId: friend.userId,
      name: "Reviews by " + friend.username,
      reviews: reviewsWithUsername,
    };
    navigation.navigate("Reviews Page", { food: userFood });
  }

  return (
    <View style={styles.friendsContainer}>
      {friends.map((friend) => (
        <View key={friend.userId} style={styles.friendContainer}>
          <TouchableOpacity
            key={friend.userId}
            onPress={() => viewFriendReviews(friend)}
          >
            {"photoUrl" in friend && friend.photoUrl ? (
              <Image
                key={friend.userId}
                source={{ uri: friend.photoUrl }}
                style={styles.circle}
              />
            ) : (
              <Image
                key={friend.userId}
                source={require("../assets/defaultProfilePicture.png")}
                style={styles.circle}
              />
            )}
            <Text key={friend.userId} style={styles.friendText}>
              {friend.username}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  friendsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
    alignSelf: "flex-start",
  },
  friendContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#B30738",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  friendText: {
    fontFamily: "Bungee",
    fontSize: 15,
    color: "#FFFFFF",
    padding: 5,
  },
});
