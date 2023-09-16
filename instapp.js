function getFollowerCount() {
    const username = document.getElementById("username").value;
    const url = `https://www.instagram.com/${username}/?__a=1`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const followerCount = data.graphql.user.edge_followed_by.count;
        document.getElementById("followerCount").innerHTML = `This account has ${followerCount} followers.`;
      })
      .catch(error => {
        document.getElementById("followerCount").innerHTML = "Unable to retrieve follower count. Please try again.";
      });
  }