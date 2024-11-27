import http from "../utils/http";
import { auth } from "../api/apiRoutes";

const googleLogin = async (idToken) => {
  const response = await http.post(auth.googleLogin, { idToken });
  return response;
};

const login = async (reqBody) => {
  const response = await http.post(auth.login, reqBody);
  return response;
};

const register = async (reqBody) => {
  const response = await http.post(auth.register, reqBody);
  return response;
};

export { googleLogin, login, register };
