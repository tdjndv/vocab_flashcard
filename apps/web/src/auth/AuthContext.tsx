import {createContext, useContext, useEffect, useState} from "react"
import { type UserDto, getMe} from "../api/auth"

type AuthContextValue = {
    user: UserDto | null;
    setUser: (user: UserDto | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<UserDto | null>(null)


    useEffect(() => {
        async function run() {
            try {
                const me = await getMe()
                setUser(me)
            } catch(e) {
                //catch rejected promise
            }
        }
        run()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAth must be with AuthProvider")
    }
    return ctx
}