import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import App from '../App'
import logo from '/assets/logo.png'


const supabase_url = import.meta.env.VITE_SUPABASE_URL
const supabase_public_key = import.meta.env.VITE_SUPABASE_PUBLIC_KEY
// Doc: https://supabase.com/docs/guides/auth/quickstarts/react
const supabase = createClient( supabase_url, supabase_public_key)


export default function Login() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    // Test backend auth:
    // import axios from 'axios';
    // useEffect(() => {
    //     if (session) {
    //         const fetchData = async () => {
    //             try {
    //                 const { access_token } = session;
    //                 const response = await axios.get('http://127.0.0.1:8000/cloud', {
    //                     headers: {
    //                         Authorization: `Bearer ${access_token}`
    //                     }
    //                 });
    //                 console.log(response.data);
    //             } catch (error) {
    //                 if (error.response && error.response.status === 401) {
    //                     // Handle token refresh logic
    //                     console.error('Token expired, refreshing...');
    //                     const { data: { session } } = await supabase.auth.refreshSession();
    //                     setSession(session);
    //                 } else {
    //                     console.error('Error fetching data from backend:', error);
    //                 }
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [session]);

    if (!session) {
        return (
            // Doc: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui
            <div className="flex h-screen min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-32 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: '#6366f1'
                                    },
                                },
                            },
                        }}
                        providers={[]}
                        theme="dark"
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <App session={session} supabase={supabase} setSession={setSession} />
        )
    }
}
