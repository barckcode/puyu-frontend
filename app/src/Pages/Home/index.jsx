import Navbar from "../../Components/Navbar"


const features = [
    { id: 1, name: 'Vite + React + Tailwind Basic Setup', state: true },
    { id: 2, name: 'React Router Dom Setup', state: true },
    { id: 3, name: 'Navbar Component', state: true },
    { id: 4, name: 'Home Page', state: true },
    { id: 5, name: 'NotFound Page', state: true },
    { id: 6, name: 'Login Page', state: true },
    { id: 7, name: 'Supabase Authentication and Registration Logic', state: true },
    { id: 8, name: 'LocalStorage Custom Hook', state: false },
    { id: 9, name: 'More coming soon... 🚀', state: false },
]


export default function Home() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center pt-24 px-6 sm:px-8 lg:px-10">
                <fieldset className="w-full max-w-screen-md">
                    <legend className="text-base text-center font-semibold leading-6">Features</legend>
                    <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                        {features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="relative flex items-start py-4">
                            <div className="min-w-0 flex-1 text-sm leading-6">
                            <label htmlFor={`feature-${feature.id}`} className="select-none font-medium">
                                {feature.name}
                            </label>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                            <input
                                id={`feature-${feature.id}`}
                                name={`feature-${feature.id}`}
                                type="checkbox"
                                checked={feature.state}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            <div className="text-center pt-24">
                <h6>From the 🇮🇨 Canary Islands to the 🌎 </h6>
            </div>
        </>
    )
}
