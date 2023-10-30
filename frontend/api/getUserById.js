export default getUserById = async (userId) => {
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
    return data.user;
}