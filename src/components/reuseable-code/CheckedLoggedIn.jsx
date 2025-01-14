import Cookies from "js-cookie";


//Check if cookies exist for admin
export const checkAdminLoggedIn = () => {
  return Cookies.get("admin_session") !== undefined;
};
