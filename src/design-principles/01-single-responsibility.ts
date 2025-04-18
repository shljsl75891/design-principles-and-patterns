/**
/* It should not be responsible for creating the user or managing the user data
* It should not be responsible for any other logic
*/
class User {
  constructor(_name: string, _email: string) {}
}

/**
 * This class must only be responsible for authenticating the user.
 * It should not be responsible for creating the user or managing the user data.
 */
class UserAuthentication {
  constructor(_user: User) {}

  authenticate(_password: string) {
    console.log("Authenticating the user and verifying the credentials");
  }
}

const user = new User("Sahil", "sj@gmail.com");
const userAuth = new UserAuthentication(user);

userAuth.authenticate("testkndklsankdlml");
