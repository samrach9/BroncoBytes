import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TopBar } from "../components/topBar";
import { Footer } from "../components/footer";
import { UserContext } from "../App";
import { AllUsersContext } from "../App";
import getUserById from "../api/getUserById";

export default function Friends() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function getFriends() {
      if (!("friends" in user) || !user.friends || user.friends.length == 0) {
        setLoading(false);
        return;
      }
      for (const friendId of user.friends) {
        let friend = await getUserById(friendId, allUsers, setAllUsers);
        setFriends([...friends, friend]);
      }
      setLoading(false);
    }
    getFriends();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TopBar text={"Friends"} />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.miscButtons}>
              <Text style={styles.miscText}>Newest</Text>
              <Image
                source={require("../assets/plus.png")}
                style={{
                  height: 25,
                  width: 25,
                }}
                onTouchEnd={() => navigation.navigate("Adding Friends")}
              />
            </View>
            {loading ? (
              <ActivityIndicator
                style={{ padding: 10 }}
                size="large"
                color="white"
              />
            ) : (
              <View style={styles.friendsContainer}>
                {friends.map((friend) => (
                  <View key={friend.userId} style={styles.friendContainer}>
                    {"photoUrl" in friend && friend.photoUrl ? (
                      <Image
                        source={{ uri: user.photoUrl }}
                        style={styles.circle}
                      />
                    ) : (
                      <Image
                        source={require("../assets/defaultProfilePicture.png")}
                        style={styles.circle}
                      />
                    )}
                    <Text style={styles.friendText}>{friend.username}</Text>
                  </View>
                ))}
              </View>
            )}
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
  },
  contentContainer: {
    flex: 1,
  },
  friendsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  friendContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  miscButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  circle: {
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    height: 150,
    backgroundColor: "#D9D9D9",
    marginBottom: 7,
  },
  friendText: {
    color: "white",
    fontFamily: "Bungee",
    fontSize: 20,
  },
  miscText: {
    color: "white",
    fontFamily: "Bungee",
    fontSize: 15,
  },
});
