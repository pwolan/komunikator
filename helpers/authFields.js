module.exports = {
  loginFields: [
    { label: "username", name: "username", placeholder: "Username", icon: "fa-user" },
    {
      label: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: "fa-lock"
    }
  ],
  registerFields: [
    { label: "mail", name: "mail", placeholder: "E-mail", icon: "fa-envelope" },
    {
      label: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: "fa-lock"
    },
    {
      label: "repeat password",
      type: "password",
      name: "repeatPassword",
      placeholder: "Reapeat Password",
      icon: "fa-lock"
    },
    { label: "username", name: "username", placeholder: "Username", icon: "fa-user" },
    { label: "name", name: "name", placeholder: "Name", icon: "fa-user-circle" },
    { label: "surname", name: "surname", placeholder: "Surname", icon: "fa-user-circle" },
    { label: "birth date", name: "birth_date", type: "date", icon: "fa-birthday-cake" },
    { label: "sex", name: "sex", placeholder: "Select Sex:", icon: "fa-venus-mars" },
    { label: "I accepted everything", name: "terms" }
  ]
};
