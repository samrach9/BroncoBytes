import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const NewFriends = ({ imageUrl, onPress }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowPress = () => {
    // Toggle the follow state
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      </View>
      <TouchableOpacity
        onPress={handleFollowPress}
        style={[styles.followButton, isFollowing ? styles.followingButton : null]}
      >
        <Text style={[styles.followButtonText, isFollowing ? styles.followingText : null]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it a perfect circle
    overflow: 'hidden',
    marginBottom: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50, // Make it a perfect circle
  },
  followButton: {
    backgroundColor: 'red', // Default button color
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  followingButton: {
    backgroundColor: 'white', // Color when following
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  followingText: {
    color: 'red', // Text color when following
  },
});

export default NewFriends;
