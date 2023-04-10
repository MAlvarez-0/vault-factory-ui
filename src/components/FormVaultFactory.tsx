import React from "react";
import {goerliVaultFactoryAddress, vaultFactoryABI} from "../utils/vaultFactoryContract";
import { useSigner, useContractWrite } from 'wagmi'


export const FormVaultFactory = () => {
    const { data: signer } = useSigner()


    const contractConfig = {
        address: goerliVaultFactoryAddress,
        abi: vaultFactoryABI,
        signerOrProvider: signer,
        functionName: 'deployVault',
    }

    const { write: createVaultWrite, error: claimError, isError: isClaimError } = useContractWrite(contractConfig)
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const asset = formData.get('asset');
        const name = formData.get('name');
        const symbol = formData.get('symbol');
        const claimer = formData.get('claimer');
        const twabController = formData.get('twab-controller');
        const yieldVault = formData.get('yield-vault');
        const prizePool = formData.get('prize-pool');
        const owner = formData.get('owner');

        if (createVaultWrite != undefined) {
            createVaultWrite({ recklesslySetUnpreparedArgs: [asset, name, symbol, twabController, yieldVault, prizePool, claimer, owner] })
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg px-8 pt-4 pb-8 z-20 "
        >
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-asset"
                    >
                        Asset
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-asset"
                        name="asset"
                        type="text"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-name"
                    >
                        Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-name"
                        name="name"
                        type="text"
                        required={true}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-symbol"
                    >
                        Symbol
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-symbol"
                        name="symbol"
                        type="text"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3 ">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-claimer"
                    >
                        Claimer
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-claimer"
                        name="claimer"
                        type="text"
                        required={true}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-twab-controller"
                    >
                        TWAB Controller
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-twab-controller"
                        name="twab-controller"
                        type="text"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-yield-vault"
                    >
                        Yield Vault (ERC-4626)
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-yield-vault"
                        name="yield-vault"
                        type="text"
                        required={true}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-prizePool"
                    >
                        Prize Pool
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-owner"
                        name="prize-pool"
                        type="text"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-owner"
                    >
                        Owner
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-owner"
                        name="owner"
                        type="text"
                        required={true}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button type={'submit'} className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
                    Create Vault
                </button>
            </div>
        </form>
    );
}