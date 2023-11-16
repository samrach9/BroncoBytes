import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export function AccountProfile({ user }) {
  const lastActiveDate = new Date(
    "lastActive" in user && user.lastActive
      ? user.lastActive * 1000
      : user.dateCreated * 1000
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
        {"photoUrl" in user && user.photoUrl ? (
          <Image source={{ uri: user.photoUrl }} style={styles.circle} />
        ) : (
          <Image
            source={require("../assets/defaultProfilePicture.png")}
            style={styles.circle}
          />
        )}
      </View>
      <View style={styles.myProfileTextContainer}>
        <Text style={styles.usernameText}>{user.username}</Text>
        <Text style={styles.postsText}>Posts: {user.totalReviews}</Text>
        <Text style={styles.lastActiveText}>
          Last Active: {lastActiveString}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    lastActiveText: {
        fontFamily: 'Bungee',
        fontSize: 12,
        color: 'white',
        padding: 10,
    },
    userInformationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    profileIconContainer: {
        marginTop: 60,
    },
    myProfileTextContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameText: {
        fontFamily: 'Bungee',
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    postsText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
    },
    circle: {
        borderRadius: 75,
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 150,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});