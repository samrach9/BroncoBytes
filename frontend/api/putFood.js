export default putFood = async (food) => {
    let response = await fetch(
        'https://90nh29n5b7.execute-api.us-west-2.amazonaws.com/prod/putFood',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(food)
        }
    );
    let data = await response.json();
    console.debug(data);
    return data.foodId;
}