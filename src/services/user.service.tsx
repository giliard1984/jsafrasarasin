
import type { Credential, Account } from "@definitions/global";
// import { doesPasswordMatch } from "@/helpers/password";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// retrieve the user details given an email
// validate the password is correct
export async function fetchUserCredential({ email }: Credential) {
  return (
    await fetch(`${BASE_URL}/users?email=${email}`, {
      method: "GET",
      headers: {
        // TODO: Implement bearer token when bringing backend into place
        // "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
  )?.json();
};

// create the user account in the database
export async function createUserAccount(account: Account) {
  return (
    await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account)
    })
  )?.json()
};
