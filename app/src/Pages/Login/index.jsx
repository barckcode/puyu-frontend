import logo from '/assets/logo.png'
import SupabaseAuth from "../../Components/SupabaseAuth";


export default function Login() {
    return (
        <div className="flex h-screen min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-32 w-auto"
                    src={logo}
                    alt="Your Company"
                />
                <SupabaseAuth />
            </div>
        </div>
    )
}
