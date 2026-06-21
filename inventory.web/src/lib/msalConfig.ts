import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "19d5334f-eaf4-4b05-8089-70c2deca560e",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: typeof window !== "undefined"
    ? `${window.location.origin}/login`
    : "/login"
  },
};

export const loginRequest = {
  scopes: [
    "api://19d5334f-eaf4-4b05-8089-70c2deca560e/access_as_user",
  ],
};

export const msalInstance = new PublicClientApplication(msalConfig);