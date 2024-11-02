const AuthResponseSchema = {
  AuthResponse: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "The JWT token for authentication",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        $ref: "#/components/schemas/UserDto",
      },
    },
  },
};

module.exports = AuthResponseSchema;
