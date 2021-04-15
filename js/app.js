fetch('https://randomuser.me/api/')
.then(response => response.json())
.then(data => console.log(data));
.catch( err => console.log('Error Fetching API: ', err)