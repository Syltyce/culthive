const jwt = require("jsonwebtoken");
const authenticate = require("../../middleware/authenticate");

jest.mock("jsonwebtoken");
jest.spyOn(console, "error").mockImplementation(() => {});

describe("Middleware authenticate", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test("✅ Passe au middleware suivant si le token est valide", () => {
    const mockUser = { id: "123", name: "John Doe" };
    req.headers.authorization = "Bearer validToken";
    jwt.verify.mockReturnValue(mockUser);

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("validToken", process.env.JWT_SECRET);
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  test("❌ Retourne 401 si aucun token n'est fourni", () => {
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Non autorisé" });
    expect(next).not.toHaveBeenCalled();
  });

  test("❌ Retourne 403 si le token est invalide", () => {
    req.headers.authorization = "Bearer invalidToken";
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Token invalide", error: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });
});
