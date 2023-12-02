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
                style={[styles.circle, { padding: 20 }]}
              />
            ) : (
              <Image
                key={friend.userId}
                source={require("../assets/defaultProfilePicture.png")}
                style={[styles.circle, { padding: 20 }]}
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
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: "flex-start",
    flexWrap: "wrap",
  },
  friendContainer: {
    flexDirection: "column",
    width: "48%",
    alignItems: "center",
    padding: 20,
  },
  circle: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: "#B30738",
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    minWidth: "48%",
  },
  friendText: {
    fontFamily: "Bungee",
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: 'center',
    paddingTop: 10,
  },
});
