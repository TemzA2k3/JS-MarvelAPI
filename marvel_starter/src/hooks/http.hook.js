import { useState, useCallback } from "react";

export const useHttp = () => {

    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)
    const [process, setProcess] = useState("Waiting")

    const request = useCallback(async (url, method='GET', body=null, headers={'Content-Type': 'application/json'}) => {
        // setLoading(true)
        setProcess("Loading")
        try{
            const response = await fetch(url, {method, body, headers})
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json()
            // setLoading(false)

            return data

        } catch(e){
            // setLoading(false)
            // setError(e.message)
            setProcess("Error")
            throw e
        }
    }, [])

    const clearError = useCallback(() => {
        // setError(null)
        setProcess("Loading")
    } ,[])

    return {
        // loading,  
        // error, 
        request, 
        clearError, 
        process, 
        setProcess}
}