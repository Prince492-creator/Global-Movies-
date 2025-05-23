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
const provider = new firebase.auth.GoogleAuthProvider();

function getReferrer() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || null;
}

function signInWithGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const uid = user.uid;
      const referrerId = getReferrer();

      // Save user info and referral in Firebase Realtime Database
      firebase.database().ref('users/' + uid).set({
        name: user.displayName,
        email: user.email,
        referredBy: referrerId || "none",
        joinedAt: Date.now()
      });

      alert("Welcome, " + user.displayName);
    })
    .catch((error) => {
      console.error(error);
      alert("Login failed.");
    });
}
<script>
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const refLink = `${window.location.origin}?ref=${user.uid}`;
      const refLinkElement = document.getElementById("referralLink");
      const refSection = document.getElementById("referral-section");

      refLinkElement.textContent = refLink;
      refLinkElement.href = refLink;
      refSection.style.display = "block";
    }
  });
</script>
<button onclick="copyReferral()">Copy Referral Link</button>

<script>
  function copyReferral() {
    const link = document.getElementById("referralLink").textContent;
    navigator.clipboard.writeText(link).then(() => {
      alert("Referral link copied!");
    });
  }
</script>
