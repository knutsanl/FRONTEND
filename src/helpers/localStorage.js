// CODE TAKEN FROM LECTURES IN FULLSTACK (on-campus-tracker)

const LOCAL_STORAGE_PREFIX = "plant-tracker-";

function getToken() {
  return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}token`));
}

function getUser() {
  return JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}user`));
}

function setUser(user) {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}user`, JSON.stringify(user));
}

function setToken(token) {
  localStorage.setItem(`${LOCAL_STORAGE_PREFIX}token`, JSON.stringify(token));
}

function clearLocalStorage() {
  localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}token`);
  localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}user`);
}

export { getToken, setToken, getUser, setUser, clearLocalStorage };
