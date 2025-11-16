// ======= Entra External ID / B2C config =======
const clientId = "ad4da28e-4b18-4e1f-995d-38aeb730f652";
const tenantName = "LeventCanHWCustomerTenant";              // Tenant adı (büyük harf - URL'de görünen format)
const tenantId = "a6658838-4ac0-44a4-93e0-873f70e59d70";     // Directory (tenant) ID
const tenantPrimaryDomain = "LeventCanHWCustomerTenant.onmicrosoft.com"; // Domain name (büyük harf - URL'de görünen format)
const signUpSignInPolicy = "B2C_1_signup_signin"; // Azure Portal'da görünen tam ad

// Lokal mi, Azure App Service mi?
const redirectUri =
  window.location.hostname === "localhost"
    ? window.location.origin // http://localhost:3000 - tam origin kullan
    : "https://leventcan-entra-hw-webapp.azurewebsites.net";

// MSAL config
const msalConfig = {
  auth: {
    clientId: clientId,
    // ÖNEMLİ: Entra External ID (CIAM) için authority formatı
    // URL'den görünen format: https://{tenantName}.ciamlogin.com/{domainName}
    // Policy name authority URL'inde değil, başka bir yerde belirtiliyor olabilir
    // Önce domain name ile deniyoruz
    authority: `https://${tenantName}.ciamlogin.com/${tenantPrimaryDomain}`,
    knownAuthorities: [`${tenantName}.ciamlogin.com`],
    redirectUri: redirectUri
  },
  cache: {
    cacheLocation: "sessionStorage", // veya "localStorage"
    storeAuthStateInCookie: false
  }
};

const loginRequest = {
  scopes: ["openid", "profile", "offline_access"]
};

const msalInstance = new msal.PublicClientApplication(msalConfig);