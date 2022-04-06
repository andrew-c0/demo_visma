export interface User {
    username: string,
    password: string,
    userType: "admin" | "client"
}

export interface LoginUser {
    username: string,
    password: string
}