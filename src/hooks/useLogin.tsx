const login = async (user: { name: string, password: string }) => {
    // fake api request
    console.log("logging in")
    return new Promise<string>(resolve => {
        resolve(JSON.stringify({ token: "test123" }))
    }
    )
}

export default login