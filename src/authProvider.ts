import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./rest-data-provider/refreshToken";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
	login: async ({ username, password }) => {
		try
		{
			const data = await axiosInstance.post('/auth/admin', { username, password })
			if(data.data?.accessToken)
			{
				const { accessToken } = data.data
				localStorage.setItem(TOKEN_KEY, accessToken)
				axiosInstance.defaults.headers.common = {
                    Authorization: `Bearer ${accessToken}`,
                }
				return {
					success: true,
					redirectTo: "/",
				}
			}
			else
			{
				return {
					success: false,
					error: {
						name: "LoginError",
						message: "Invalid username or password",
					},
				}
			}
		}
		catch(e)
		{
			console.error(e)
			return {
				success: false,
				error: {
				name: "LoginError",
				message: "Invalid username or password",
				},
			}
		}
	},
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
	await axiosInstance.get('/auth/logout')
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
	const token = localStorage.getItem(TOKEN_KEY)
	if(token){
		return {
			authenticated: true,
		}
	}
	return {
		authenticated: false,
		redirectTo: "/login",
	}
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
	const user = await axiosInstance.get('/admins/identity')
	const { _id, username } = user.data
	console.log(_id)
	return {
		id: _id,
		name: username,
		avatar: "",
	}
    // return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
