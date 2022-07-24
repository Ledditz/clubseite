import { useEffect, useState } from "react"

export interface user {
    id: string,
    name: string,
    amount: number
}

const userDataMock: user[] = [
    { id: "1", name: "Hans Wurst", amount: 1.5 },
    { id: "2", name: "Max Mustermann", amount: 10 },
    { id: "3", name: "R. Satzmann", amount: 6.5 },
    { id: "4", name: "Spritt Kanne", amount: 0.5 },
    { id: "5", name: "Karl Gustav", amount: 1.5 },
    { id: "6", name: "Hinz", amount: 10 },
    { id: "7", name: "Kunz", amount: 6.5 },
    { id: "8", name: "Max", amount: 0.5 },
    { id: "9", name: "Moritz", amount: 1.5 },
    { id: "10", name: "Dings Bums", amount: 10 },
    { id: "11", name: "R. Satzmann", amount: 6.5 },
    { id: "12", name: "Spritt Kanne", amount: 0.5 },
    { id: "13", name: "Hans Günther", amount: 1.5 },
    { id: "14", name: "Max Mustermann", amount: 10 },
    { id: "15", name: "R. Satzmann", amount: 6.5 },
    { id: "16", name: "Spritt Kanne", amount: 0.5 }
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