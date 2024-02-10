import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const navigate = useNavigate()

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:2500/api/user/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            navigate('/login')

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}