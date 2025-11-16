// authUI.js

const signInButton = document.getElementById("btn-signin");
const signOutButton = document.getElementById("btn-signout");
const statusDiv = document.getElementById("status");
const protectedDiv = document.getElementById("protected");
const userNameSpan = document.getElementById("user-name");
const userEmailSpan = document.getElementById("user-email");

// MSAL instance'ı initialize et ve redirect response'larını yakala
msalInstance
  .initialize()
  .then(() => {
    return msalInstance.handleRedirectPromise();
  })
  .then((response) => {
    if (response) {
      // Yeni login
      handleResponse(response);
    } else {
      // Daha önce login oldu mu?
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        showSignedIn(accounts[0]);
      } else {
        showSignedOut();
      }
    }
  })
  .catch((error) => {
    console.error("MSAL initialization or redirect error:", error);
    statusDiv.textContent = "Error: " + (error.message || "Authentication error");
    showSignedOut();
  });

function handleResponse(response) {
  if (response.account) {
    showSignedIn(response.account);
  } else {
    showSignedOut();
  }
}

function showSignedIn(account) {
  statusDiv.textContent = "Signed in";
  signInButton.style.display = "none";
  signOutButton.style.display = "inline-block";
  protectedDiv.style.display = "block";

  userNameSpan.textContent =
    account.name || account.idTokenClaims?.given_name || "User";
  userEmailSpan.textContent =
    account.username || account.idTokenClaims?.emails?.[0] || "";
}

function showSignedOut() {
  statusDiv.textContent = "Not signed in";
  signInButton.style.display = "inline-block";
  signOutButton.style.display = "none";
  protectedDiv.style.display = "none";
}

signInButton.addEventListener("click", async () => {
  try {
    // Popup flow kullan - SPA için daha uygun
    const response = await msalInstance.loginPopup(loginRequest);
    if (response) {
      handleResponse(response);
    }
  } catch (error) {
    console.error("Login error:", error);
    // Popup başarısız olursa redirect'i dene
    try {
      msalInstance.loginRedirect(loginRequest);
    } catch (redirectError) {
      console.error("Redirect error:", redirectError);
      statusDiv.textContent = "Error: " + (error.message || "Authentication error");
    }
  }
});

signOutButton.addEventListener("click", () => {
  const logoutRequest = {
    postLogoutRedirectUri: window.location.origin
  };
  msalInstance.logoutRedirect(logoutRequest);
});