import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "@/app/register/page";
import { useAuth } from "@/context/AuthContext";

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("RegisterPage", () => {
  it("calls register with email and password on submit", async () => {
    const mockRegister = jest.fn().mockResolvedValue(undefined);
    (useAuth as jest.Mock).mockReturnValue({ register: mockRegister });

    render(<RegisterPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("shows an error message when registration fails", async () => {
    const mockRegister = jest.fn().mockRejectedValue(new Error("Email already registered"));
    (useAuth as jest.Mock).mockReturnValue({ register: mockRegister });

    render(<RegisterPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), "dup@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText("Email already registered")).toBeInTheDocument();
  });
});
