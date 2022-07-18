import { useEffect, useState } from "react"

export const useSendApiCall = (url: string) => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<any>({})
    const [error, setError] = useState(false)

    const sendData = (data: any) => {
        // hier müsste jetzt die magie passieren
        if (!loading) {
            setLoading(true)
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