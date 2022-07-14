import { useEffect, useState } from "react"

export interface user {
    name: string,
    amount: number
}

export const useFetchUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<user[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        // hier nach den usern fetchen 
        // error handling

    }, [])

    return {
        isLoading: loading,
        users,
        error
    }

}