import { useState } from "react"

export const useSendApiCall = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>({})
    const [error, setError] = useState(false)

    const sendData = (url: string, data: any) => {
        // hier müsste jetzt die magie passieren
        if (!loading) {
            setLoading(true)
            setError(false)
            console.log(url, data)
            setTimeout(() => {
                console.log("fertig")
                setError(true)
                setLoading(false)
            }, 3000)
        }
    }

    return {
        isLoading: loading,
        error,
        response,
        sendData
    }

}