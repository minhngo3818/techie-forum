import { LoginInterface} from "../../interfaces/user/login-interface"
import { RegisterInterface } from "../../interfaces/user/register-interface"
import { RefreshLoginInterface } from "../../interfaces/user/refresh-login-interface"
import { APIConfig } from "../api-config/api-config"

export async function loginService(data: LoginInterface) {
  const response = await fetch(`${APIConfig.baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Conten-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

export async function logoutService() {
  const response = await fetch(`${APIConfig.baseUrl}/user/logout`)

  return response
}

export async function registerService(data: RegisterInterface) {
  const response = await fetch(`${APIConfig.baseUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response
}

export async function refreshLoginService(data: RefreshLoginInterface) {
  const response = await fetch(`${APIConfig.baseUrl}/user/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response
}