const UserSchema = {
  User: {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      username: {
        type: "string",
        description: "The user's username",
        example: "john_doe"
      },
      email: {
        type: "string",
        description: "The user's email address",
        example: "john.doe@example.com"
      },
      password: {
        type: "string",
        description: "The user's password",
        example: "password123"
      },
      role: {
        type: "string",
        description: "The user's role",
        enum: ["user", "admin"],
        example: "user"
      }
    }
  },
  UserDto: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "john_doe"
      },
      email: {
        type: "string",
        example: "john.doe@example.com"
      },
      role: {
        type: "string",
        example: "admin"
      }
    }
  }
};

module.exports = UserSchema;
