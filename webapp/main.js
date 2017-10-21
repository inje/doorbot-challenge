// Entry point for your app

// Elements
const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');
const mainContainer = document.getElementById('main-container');
const addUserForm = document.getElementById('form-add-user');
const addDoorForm = document.getElementById('form-add-door');

// Login
loginForm.onsubmit = function() {
  event.preventDefault();
  const username = event.target.elements[0].value;
  const password = event.target.elements[1].value;
  event.target.elements[0].value = '';
  event.target.elements[1].value = '';
  fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => {
      if (res.status === 200) {
        loginForm.style.display = 'none';
        logoutForm.style.display = 'block';
        mainContainer.style.display = 'block';
      }
    })
}

// Logout
logoutForm.onsubmit = function() {
  event.preventDefault();
  fetch('/auth', {
    headers: new Headers(),
    credentials: 'same-origin',
    method: 'DELETE'
  })
  .then(res => {
    if (res.status === 200) {
      loginForm.style.display = 'block';
      logoutForm.style.display = 'none';
      mainContainer.style.display = 'none';
    }
  });
};

// Add user
addUserForm.onsubmit = function() {
  event.preventDefault();
  const username = event.target.elements[0].value;
  event.target.elements[0].value = '';

  fetch(`/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      username
    })
  })
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      alert('Successfully created user');
    }
  })
  .catch(e => console.log(e));
};

// Add door
addDoorForm.onsubmit = function() {
  event.preventDefault();
  const name = event.target.elements[0].value;
  event.target.elements[0].value = '';

  fetch(`/doors`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      name
    })
  })
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      alert('Successfully created door');
    }
  })
  .catch(e => console.log(e));
};
