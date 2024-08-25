import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent  from '@testing-library/user-event';
import "@testing-library/jest-dom/vitest";
import { BrowserRouter } from "react-router-dom";
import { doesPasswordMatch } from "@/helpers/password";
import * as userService from "@/services/user.service";

global.fetch = vi.fn();

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
};

// components
import LoginPage from "./Login";

describe("Login page actions", () => {
  const userResponse = {
    "id": "148c7d25-9d2f-42fd-a79e-1d5286354cd9",
    "email": "user@email.com",
    "firstName": "John",
    "lastName": "Travolta",
    "password": "$2a$10$JSOvJ3s9nlszNsHyqMvwh.WWQIe2foQgHhIsyNF2u2aMeLZiw6.xy",
    "role": "user",
    "createdAt": "2024-08-23T08:56:41.928Z"
  };

  it("Verify the expected components are in place", () => {
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    // screen.debug();

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const signInButton = screen.getByTestId("signin-button");

    expect(emailInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(signInButton).toBeVisible();
  });

  it("User credential is provided", async () => {
    const credential = userEvent.setup();
    render(<BrowserRouter><LoginPage /></BrowserRouter>);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const signInButton = screen.getByTestId("signin-button");

    await credential.type(emailInput, "user@email.com");
    await credential.type(passwordInput, "123456");
    await credential.click(signInButton);

    expect(emailInput.value).toBe("user@email.com");
    expect(passwordInput.value).toBe("123456");
  });

  it("Makes a POST request to fetch the users crendential, returns the result and validate credential (correct)", async () => {
    const credential = { name: "user@email.com", password: "123456" };

    fetch.mockResolvedValue(createFetchResponse(userResponse));
    const userCredential = await userService.fetchUserCredential(credential);
    vi.spyOn(userService, "fetchUserCredential");

    const isValid = await credential?.password && userCredential?.password ? doesPasswordMatch(credential.password, userCredential?.password) : false;

    expect(userCredential).toStrictEqual(userResponse);
    expect(isValid).toBeTruthy();
  });

  it("Makes a POST request to fetch the users crendential, returns the result and validate credential (doesn't match)", async () => {
    const credential = { name: "user@email.com", password: "789456" };

    fetch.mockResolvedValue(createFetchResponse(userResponse));
    const userCredential = await userService.fetchUserCredential(credential);
    vi.spyOn(userService, "fetchUserCredential");
    
    const isValid = await credential?.password && userCredential?.password ? doesPasswordMatch(credential.password, userCredential?.password) : false;

    expect(userCredential).toStrictEqual(userResponse);
    expect(isValid).toBeFalsy();
  });
});
