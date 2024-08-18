import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()


export function AuthContextProvider({ children }) {

    const [token, setToken] = useState(null)

    useEffect(() => {

        if (localStorage.getItem("userToken")) {
            setToken(localStorage.getItem("userToken"))
        }
    }, [])

    return (<>

        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>

    </>)
}
