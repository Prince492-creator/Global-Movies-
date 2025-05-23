const auth = firebase.auth();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      userInfo.innerText = `Hello, ${user.displayName}`;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
    })
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    userInfo.innerText = '';
    loginBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
  });
});
