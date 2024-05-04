import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const supabase_url = import.meta.env.VITE_SUPABASE_URL
const supabase_public_key = import.meta.env.VITE_SUPABASE_PUBLIC_KEY


// Doc: https://supabase.com/docs/guides/auth/quickstarts/react
const supabase = createClient( supabase_url, supabase_public_key)


export default function SupabaseAuth() {
    {
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

        if (!session) {
            return (
                // Doc: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui
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
            )
        }
        else {
            return (<div>Logged in!</div>)
        }
    }
}
