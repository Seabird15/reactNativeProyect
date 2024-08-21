import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus,
    token?: string,
    user?: User

    login: (email: string, password: string) => Promise<boolean>,
    checkStatus: () => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string, fullName: string) => Promise<boolean>
}


export const useAuthStore = create<AuthState>()((set, get) => ({
 status: 'checking',
 token: undefined,
 user: undefined,

    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password)
        if(!resp) {

            set({status: 'unauthenticated', token: undefined, user: undefined})
            return false
        }
        //TODO: save token en storage

        await StorageAdapter.setItem('token', resp.token)
        set({status: 'authenticated', token: resp.token, user: resp.user})

        return true
    },

    checkStatus: async () => {
        const resp = await authCheckStatus()
        if(!resp) {

            set({status: 'unauthenticated', token: undefined, user: undefined})
            return 
        }
        //TODO: save token en storage

        await StorageAdapter.setItem('token', resp.token)
        set({status: 'authenticated', token: resp.token, user: resp.user})

    },

    logout: async () => {
        //Quitar el token del storage
        await StorageAdapter.removeItem('token')
        //Establecer nuevo status de autenticación
        set({status: 'unauthenticated', token: undefined, user: undefined})
        
    },

    
    register: async (email: string, password: string, fullName: string) => {
         const resp = await authRegister(email, password, fullName)
        if(!resp) {

            set({status: 'unauthenticated', token: undefined, user: undefined})
            return false
    }

    await StorageAdapter.setItem('token', resp.token)
    set({status: 'authenticated', token: resp.token, user: resp.user})

    return true

    }
}))