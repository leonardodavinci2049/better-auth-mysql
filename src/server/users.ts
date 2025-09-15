
import { auth } from "@/utils/auth";


export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email: "orcdev@gmail.com",
                password: "12345678",
            }
        })

        return {
            success: true,
            message: "Signed in successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}

export const signUp = async (email: string, password: string, username: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                 email: "orcdev@gmail.com",
                 password: "12345678",
                name: "OrcDev"
            }
        })

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error as Error

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}
