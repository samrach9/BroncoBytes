export default getUserByUsername = async (username, allUsers, setAllUsers) => {
    const foundUser = allUsers.find(user => user.username == username);
    if(foundUser){
        console.debug("Found user in allUsers");
        console.log(foundUser)
        return {'user': foundUser};
    }
    let response = await fetch(
        'https://90nh29n5b7.execute-api.us-west-2.amazonaws.com/prod/getUser',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        }
    );
    let data = await response.json();
    console.debug(data);
    if (data.user) {
        setAllUsers([...allUsers.filter(user => user.username != username), data.user]);
    }
    return data;
}