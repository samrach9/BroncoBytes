import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TopBar } from "../components/topBar";
import { Footer } from "../components/footer";
import getUserByEmail from "../api/getUserByEmail";
import getUserByUsername from "../api/getUserByUsername";
import { AllUsersContext } from "../App";
import { FriendsList } from "../components/friendsList";

export default function AddingFriends() {
  const { allUsers, setAllUsers } = useContext(AllUsersContext);

  const [searchInput, setSearchInput] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const search = async () => {
      let currFoundUsers = [];
      const userEmail = await getUserByEmail(
        searchInput,
        allUsers,
        setAllUsers
      );
      const userUsername = await getUserByUsername(
        searchInput,
        allUsers,
        setAllUsers
      );
      if ("user" in userEmail) {
        currFoundUsers = [...currFoundUsers.filter(user => user.email != userEmail.user.email), userEmail.user];
      }
      if ("user" in userUsername) {
        currFoundUsers = [...currFoundUsers.filter(user => user.username != userUsername.user.username), userUsername.user];
      }
      console.log(currFoundUsers);
      setFoundUsers(currFoundUsers);
      setSearching(false);
    };
    if (searchInput.length > 0 && searching) {
      search();
    } else if (searchInput.length == 0) {
      setFoundUsers([]);
      setSearching(false);
    }
  }, [searchInput, searching]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TopBar text={"Find New Friends"} />
        <ScrollView>
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>
          <View style={styles.goButtonContainer}>
            <Pressable
              style={styles.goButton}
              onPress={() => setSearching(true)}
            >
              <Text style={styles.buttonText}>Go</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            {searching ? (
              <ActivityIndicator
                style={{ padding: 10 }}
                size="large"
                color="white"
              />
            ) : foundUsers.length > 0 ? (
              <FriendsList friends={foundUsers} />
            ) : (
              <Text style={styles.miscText}>No users found</Text>
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
  buttonText: {
    fontFamily: "Bungee",
    fontSize: 20,
    color: "#B30738",
    textAlign: "center",
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#B30738",
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    backgroundColor: "#B30738",
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  goButtonContainer: {
    backgroundColor: "#B30738",
    paddingLeft: 15,
  },
  goButton: {
    width: 100,
    padding: 1,
    borderRadius: 20,
    margin: 3,
    backgroundColor: "white",
  },

  miscButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  friendIconsHorizontalContainer: {
    justifyContent: "space-between",
    margin: 25,
    borderWidth: 2,
    borderColor: "black",
  },
  friendIconRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 25,
  },
  friendIcon: {
    alignItems: "center",
  },
  circle: {
    borderRadius: "75%",
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    height: 150,
    backgroundColor: "#D9D9D9",
    marginBottom: 5,
  },
  friendText: {
    color: "white",
    fontFamily: "Bungee",
    fontSize: 20,
  },
  miscText: {
    color: "white",
    fontFamily: "Bungee",
    fontSize: 20,
  },
});
