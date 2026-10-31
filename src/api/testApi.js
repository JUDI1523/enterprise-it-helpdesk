import { loginUser } from "./authApi";

loginUser(
  "customer@example.com",
  "123456"
)
  .then((data) => {
    console.log("API LOGIN SUCCESS:");
    console.log(data);
  })
  .catch((error) => {
    console.error("API LOGIN FAILED:");
    console.error(error);
  });