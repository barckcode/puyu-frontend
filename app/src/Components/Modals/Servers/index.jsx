import { Fragment } from 'react';
import PropTypes from "prop-types";
import { Transition, Dialog } from "@headlessui/react";


export default function ServersModal({ modalIsOpen, closeModal, selectedCloud, selectedRegion, selectedDistribution, selectedInstanceType, selectedStorage, serverName }) {
    return (
        <Transition show={modalIsOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 text-indigo-900" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-indigo-200 bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-indigo-50 px-4 pt-5 pb-4 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <Dialog.Title as="h3" className="text-xl font-bold p-4 leading-6 text-indigo-900 text-center">
                                    Server Summary
                                </Dialog.Title>
                                <div className="mt-2 text-lg">
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Cloud:</h4>
                                        <p className="w-1/2">{selectedCloud?.name || 'Select a cloud'}</p>
                                    </div>
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Name:</h4>
                                        <p className="w-1/2">{serverName}</p>
                                    </div>
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Region:</h4>
                                        <p className="w-1/2">{selectedRegion?.name || 'Select a region'}</p>
                                    </div>
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Distribution:</h4>
                                        <p className="w-1/2">{selectedDistribution?.distribution} {selectedDistribution?.version}</p>
                                    </div>
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Instance Type:</h4>
                                        <p className="w-1/2">{selectedInstanceType?.cpu} / {selectedInstanceType?.memory}</p>
                                    </div>
                                    <div className="flex p-4 items-center text-center border-t-2 border-indigo-100">
                                        <h4 className="w-1/2 font-medium">Storage:</h4>
                                        <p className="w-1/2">{selectedStorage?.size} GiB</p>
                                    </div>
                                </div>
                                <div className="w-full mt-4 flex justify-evenly">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-indigo-50 shadow-sm hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                        // onClick={}
                                    >
                                        Create
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

ServersModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectedCloud: PropTypes.object,
    selectedRegion: PropTypes.object,
    selectedDistribution: PropTypes.object,
    selectedInstanceType: PropTypes.object,
    selectedStorage: PropTypes.object,
    serverName: PropTypes.string.isRequired
}
