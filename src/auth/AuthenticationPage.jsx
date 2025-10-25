import "react"
import {SignedIn, SignIn, SignUp, SignedOut} from "@clerk/clerk-react";


export default function AuthenticationPage() {
    return (
        <div className="auth-container">
            <SignedOut>
                <SignIn routing="path" path="/sign-in"/>
                <SignUp routing="path" path="/sign-up" />
            </SignedOut>
            <SignedIn>
                <div className="redirect-message">
                    <p>You are already signed in.</p>
                    <p>Redirecting to home page...</p>
                </div>
            </SignedIn>
        </div>
    )
}