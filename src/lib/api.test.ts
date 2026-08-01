import { apiFetch } from "@/lib/api";

describe("apiFetch", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("sends a request with the correct headers and returns JSON", async () => {
    localStorage.setItem("access_token", "test-token");
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ message: "success" }),
    }) as jest.Mock;

    const result = await apiFetch("/test");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
      })
    );
    expect(result).toEqual({ message: "success" });
  });

  it("throws with the backend's error detail on a failed request", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ detail: "Something went wrong" }),
    }) as jest.Mock;

    await expect(apiFetch("/test")).rejects.toThrow("Something went wrong");
  });

  it("returns null for a 204 No Content response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
    }) as jest.Mock;

    const result = await apiFetch("/test", { method: "DELETE" });
    expect(result).toBeNull();
  });
});
