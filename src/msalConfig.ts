// src/msalConfig.ts
import { PublicClientApplication } from "@azure/msal-browser";

const apiScope = import.meta.env.VITE_MSAL_API_SCOPE;
const apiScopes = apiScope ? [apiScope] : ["User.Read"];

export const msalConfig = {
  auth: {
    clientId: "bc982842-3b01-4cd9-9470-5385e2aa1616",
    authority: "https://login.microsoftonline.com/1dd0771c-5eff-4812-bf13-92380ca8b2aa",
    redirectUri: "http://localhost:5174",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", ...apiScopes],
};

export const tokenRequest = {
  scopes: apiScopes,
};

export const msalInstance = new PublicClientApplication(msalConfig);