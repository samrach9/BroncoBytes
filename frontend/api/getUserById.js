export default getUserById = async (userId, allUsers, setAllUsers) => {
    const foundUser = allUsers.find(user => user.userId == userId);
    if (foundUser) {
        console.debug("Found user in allUsers");
        console.log(foundUser)
        return foundUser;
    }
    let response = await fetch(
        'https://90nh29n5b7.execute-api.us-west-2.amazonaws.com/prod/getUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        }
    );
    let data = await response.json();
    console.debug(data);
    if(data.user) {
        setAllUsers([...allUsers.filter(user => user.userId != userId), data.user]);
    }
    return data.user;
}