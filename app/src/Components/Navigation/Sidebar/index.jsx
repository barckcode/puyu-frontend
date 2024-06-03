import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    Cog6ToothIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Project from '../Project';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Sidebar({ sidebarOpen, setSidebarOpen, helmcodeLogo, projects, backendUrl, apiToken }) {
    const location = useLocation()

    const navigation = [
        { name: 'Home', href: '/', icon: HomeIcon, current: location.pathname === '/' }
    ]

    const currentPage = navigation.find(item => item.href === location.pathname);
    const currentPageName = currentPage ? currentPage.name : 'Dashboard';

    return (
        <>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
					<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/80" />
					</Transition.Child>

					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
										<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
									<div className="flex h-16 shrink-0 items-center">
										<img
											className="h-20 w-20"
											src={helmcodeLogo}
											alt="Helmcode Company"
										/>
									</div>
									<Project projects={projects} backendUrl={backendUrl} apiToken={apiToken} />
									<nav className="flex flex-1 flex-col">
										<ul role="list" className="flex flex-1 flex-col gap-y-7">
											<li>
												<ul role="list" className="-mx-2 space-y-1">
													{navigation.map((item) => (
														<li key={item.name}>
															<Link
																to={item.href}
																className={classNames(
																	item.current
																	? 'bg-gray-800 text-white'
																	: 'text-gray-400 hover:text-white hover:bg-gray-800',
																	'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																)}
																onClick={() => setSidebarOpen(false)}
															>
															<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
															{item.name}
															</Link>
														</li>
													))}
												</ul>
											</li>
                                            <li className="mt-auto">
                                                <Link
                                                    to="#"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                >
                                                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                    Settings
                                                </Link>
                                            </li>
										</ul>
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
					<div className="flex h-16 shrink-0 items-center">
						<img
							className="h-24 w-24"
							src={helmcodeLogo}
							alt="Your Company"
						/>
					</div>
					<Project projects={projects} backendUrl={backendUrl} apiToken={apiToken} />
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7 pb-4">
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item) => (
										<li key={item.name}>
											<Link
												to={item.href}
												className={classNames(
													item.current
													? 'bg-gray-800 text-white'
													: 'text-gray-400 hover:text-white hover:bg-gray-800',
													'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
												)}
											>
											<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
											{item.name}
											</Link>
										</li>
									))}
								</ul>
							</li>
                            <li className="mt-auto">
                                <Link
                                    to="#"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    Settings
                                </Link>
                            </li>
						</ul>
					</nav>
				</div>
			</div>

			<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
					<span className="sr-only">Open sidebar</span>
					<Bars3Icon className="h-6 w-6" aria-hidden="true" />
				</button>
				<div className="flex-1 text-sm font-semibold leading-6 text-white">{currentPageName}</div>
			</div>
        </>
    )
}

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    helmcodeLogo: PropTypes.string.isRequired,
	projects: PropTypes.array.isRequired,
	backendUrl: PropTypes.string.isRequired,
	apiToken: PropTypes.string.isRequired,
};
