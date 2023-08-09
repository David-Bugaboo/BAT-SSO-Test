import { useRouter } from 'next/router'
import React, { createContext, useEffect, useRef, useState } from 'react';
import ApiPaths from '../core/apiPaths'
import AppPaths from '../core/appPaths'
import InputLogin from '../DTOs/InputLogin'
import OutputLogin from '../DTOs/OutputLogin'
import { HttpService } from '../services/HTTP.service'
import { SessionService } from '../services/sessionStorage.service'

interface SignInCredential {
  email: string,
  password: string
}

interface AuthContextData {
  isAuthenticated: boolean
  signIn(credentials: SignInCredential): Promise<void>
  checkAuth(): void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const router = useRouter();
  function checkAuth() {
    if(!isAuthenticated) {
      router.push(AppPaths.login)
    }
  }
  async function signIn(credrential: SignInCredential) {
    try {
    const HTTPService = new HttpService()
    const response = await HTTPService.post<InputLogin, OutputLogin>(ApiPaths.signin, credrential )
    setAuthenticated(!!response.token)
    } catch( error ) {
      throw alert('Usuário ou senha errado')   
    }
  }
    return (
      <AuthContext.Provider value={{signIn, isAuthenticated, checkAuth}}>
        { children }
      </AuthContext.Provider>
    )

}