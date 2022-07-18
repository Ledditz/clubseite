import { useEffect, useState } from "react"

export interface user {
    name: string,
    amount: number
}

const userDataMock: user[] = [
    { name: "Hans Wurst", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 },
    { name: "Karl Gustav", amount: 1.5 },
    { name: "Hinz", amount: 10 },
    { name: "Kunz", amount: 6.5 },
    { name: "Max", amount: 0.5 },
    { name: "Moritz", amount: 1.5 },
    { name: "Dings Bums", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 },
    { name: "Hans Günther", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 }
]

export const useFetchUsers = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<user[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        // hier nach den usern fetchen 
        // error handling
        setTimeout(() => {
            setLoading(false)
            // setError(true)
            setUsers(userDataMock)
        }, 500)
    }, [])

    return {
        isLoading: loading,
        users,
        error
    }

}