import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import type { Account } from "@definitions/global";
import { hashedPassword } from "@/helpers/password";
import { createUserAccount } from "@/services/user.service";

// handles the creation of the account
// TODO: check if the user is created before sending the request (preventing duplication). This should be done in the backend
export const createAccount = async (
  isAdmin: boolean,
  account: Partial<Account>
): Promise<Account | Error | void> => {
  if (!account || Object.keys(account)?.length === 0) return;

  account.id = uuidv4();
  account.role = isAdmin ? "admin" : "user";
  account.createdAt = dayjs().toISOString();
  if (account?.password) account.password = hashedPassword(account.password);

  const response = await createUserAccount(account as Account)
  .then(json => json)
  .catch((e: Error) => {
    return e;
  });

  return response;
};
