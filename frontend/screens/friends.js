import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { TopBar } from "../components/topBar";
import { Footer } from "../components/footer";
import { UserContext } from "../App";
import { AllUsersContext } from "../App";
import getUserById from "../api/getUserById";
import { FriendsList } from "../components/friendsList";

export default function Friends() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { allUsers, setAllUsers } = useContext(AllUsersContext);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function getFriends() {
      let currFriends = [];
      for (const friendId of user.friends) {
        const currFriend = await getUserById(friendId, allUsers, setAllUsers);
        if (!currFriends.includes(currFriend)) {
          currFriends.push(currFriend);
        }
      }
      setFriends(currFriends);
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
              <FriendsList friends={friends} />
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
  miscButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  miscText: {
    color: "white",
    fontFamily: "Bungee",
    fontSize: 15,
  },
});
