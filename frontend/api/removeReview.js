export default removeReview = async (reviewId) => {
    let response = await fetch(
        'https://90nh29n5b7.execute-api.us-west-2.amazonaws.com/prod/removeReview',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reviewId: reviewId})
        }
    );
    let data = await response.json();
    console.debug(data);
    return data;
}