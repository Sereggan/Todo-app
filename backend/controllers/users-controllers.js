const DUMMY_USERS = [
  {
    id: 1,
    name: "user1",
    email: "user1@user1.ru",
    password: "user1",
  },
  {
    id: 2,
    name: "user2",
    email: "user2@user2.ru",
    password: "user2",
  },
];

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  let newId = DUMMY_USERS[DUMMY_USERS.length - 1].id + 1;
  let newUser = {
    id: newId,
    name: name,
    email: email,
    password: password,
  };
  DUMMY_USERS.push(newUser);
  console.log(DUMMY_USERS);
  res.status(201).json({ userId: newUser.id, email: newUser.email });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = DUMMY_USERS.filter((user) => {
    return user.password === password && user.email === email;
  })[0];
  console.log(existingUser);
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
  });
};

exports.signup = signup;
exports.login = login;
