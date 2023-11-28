import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { UserContext } from "../App";
import { SmallRectangleButton } from "./smallRectangleButton";
import * as SecureStore from "expo-secure-store";
import updateUser from "../api/updateUser";

export function AccountProfile({ user: accountUser }) {
  const { user, setUser } = useContext(UserContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user.friends.includes(accountUser.userId)) {
      setAdded(true);
    }
  }, []);
  
  const handleAddFriend = async () => {
    const updatedFriends = [...user.friends, accountUser.userId];
    const updatedUser = user;
    updatedUser.friends = updatedFriends;
    const result = await updateUser(updatedUser);
    if ("error" in result) {
      alert(result.error);
      setAdded(false);
    } else {
      setUser(result.user);
      await SecureStore.setItemAsync("user", JSON.stringify(result.user));
      setAdded(true);
    }
  };

  const lastActiveDate = new Date(
    "lastActive" in accountUser && accountUser.lastActive
      ? accountUser.lastActive * 1000
      : accountUser.dateCreated * 1000
  );
  const lastActiveDay =
    lastActiveDate.toDateString() === new Date().toDateString()
      ? "Today"
      : lastActiveDate.toDateString() ===
        new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()
      ? "Yesterday"
      : lastActiveDate.toLocaleDateString([], {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
  const lastActiveString =
    lastActiveDay + ", " + lastActiveDate.toLocaleTimeString();

  return (
    <View style={styles.userInformationContainer}>
      <View style={styles.profileIconContainer}>
        {"photoUrl" in accountUser && accountUser.photoUrl ? (
          <Image source={{ uri: accountUser.photoUrl }} style={styles.circle} />
        ) : (
          <Image
            source={require("../assets/defaultProfilePicture.png")}
            style={styles.circle}
          />
        )}
      </View>
      <View style={styles.myProfileTextContainer}>
        <Text style={styles.usernameText}>{accountUser.username}</Text>
        <Text style={styles.postsText}>Posts: {accountUser.totalReviews}</Text>
        <Text style={styles.lastActiveText}>
          Last Active: {lastActiveString}
        </Text>
        {!added &&
          <SmallRectangleButton text="Add Friend" onClick={() => handleAddFriend()} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lastActiveText: {
    fontFamily: "Bungee",
    fontSize: 12,
    color: "white",
    padding: 10,
  },
  userInformationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  profileIconContainer: {
    marginTop: 60,
  },
  myProfileTextContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameText: {
    fontFamily: "Bungee",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  postsText: {
    fontFamily: "Bungee",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  circle: {
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 3,
    width: 100,
    height: 100,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
