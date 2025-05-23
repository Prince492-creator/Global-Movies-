<script>
  const provider = new firebase.auth.GoogleAuthProvider();

  function signInWithGoogle() {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        alert("Welcome, " + user.displayName);
        // You can store user info in Firebase Database here
      })
      .catch((error) => {
        console.error(error);
        alert("Login failed.");
      });
  }
</script>
