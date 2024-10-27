module.exports = class UserDto {
  username;
  email;
  role

  constructor(model) {
    this.username = model.username;
    this.email = model.email;
    this.role = model.role;
  }
};
