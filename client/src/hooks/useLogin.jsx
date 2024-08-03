import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

const serverLink = import.meta.env.VITE_SERVER_LINK

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user, dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${serverLink}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        // console.log(json, response);
        // console.log(json.role);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
        if (response.ok) {
            localStorage.setItem('larry-pat-user', JSON.stringify(json))

            dispatch(({ type: 'LOGIN', payload: json }))

            setIsLoading(false)

            if (json.role === "manager") {
                navigate('/manager-dashbord')
            } else if (json.role === "admin") {
                navigate('/admin-dashbord')
            } else if (json.role === "client") {
                navigate('/')
            }
        }
    }

    return { login, isLoading, error }
}
