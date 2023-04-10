import React from "react";
import {useState} from "react"
import {getVaults, goerliVaultFactoryAddress} from "../utils/vaultFactoryContract";
import { useSigner, useContractWrite, useContractRead } from 'wagmi'
import {vaultAbi} from "../utils/vaultContract";
import { erc20ABI } from 'wagmi'
import {createPairAbi, goerliLiquidationPairFactoryAddress} from "../utils/liquidationPairFactoryContract";



interface vaultData {
    name : string
    symbol : string
    address : string
    addressAsset : string
    assetSymbol : string
}

let vaultMap = new Map<string, vaultData>();

function TokenSymbol(token : `0x${string}`) {
    return useContractRead({
        address: token,
        abi: erc20ABI,
        functionName: 'symbol',
    })
}

function VaultsCount() {
    return useContractRead({
        address: goerliVaultFactoryAddress,
        abi: getVaults,
        functionName: 'totalVaults',
    })
}

function Vault(id: number) {
    return useContractRead({
        address: goerliVaultFactoryAddress,
        abi: getVaults,
        functionName: 'allVaults',
        args: [id],
    })
}

function VaultSymbol(vaultAddress : `0x${string}`) {
    return useContractRead({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'symbol',
    })
}
function VaultAsset(vaultAddress : `0x${string}`) {
    return useContractRead({
        address: vaultAddress,
        abi: vaultAbi,
        functionName: 'asset',
    })
}

function AllVaults(pairsCount: number) {
    const allVaults: vaultData[] = []
    for (let i = 0; i < pairsCount; i++) {
        const { data: vaultAddress, isError: errorVault, isLoading: isLoadingVault } = Vault(i)
        if (!errorVault && !isLoadingVault) {
            const { data: name, isError: errorName, isLoading: isLoadingName } = VaultSymbol(vaultAddress as `0x${string}`)
            const { data: asset, isError: errorAsset, isLoading: isLoadingAsset } = VaultAsset(vaultAddress as `0x${string}`)
            const { data: assetSymbol, isError: errorAssetSymbol, isLoading: isLoadingAssetSymbol } = TokenSymbol(asset as `0x${string}`)
            let vault : vaultData = {name : name as string, address : vaultAddress as string, addressAsset: asset as string, assetSymbol: assetSymbol as string, symbol: ""}
            allVaults.push(vault)
            vaultMap.set(vaultAddress as `0x${string}`, vault)
        }
    }
    return allVaults
}



export const FormLiquidationPair = () => {
    const { data: signer } = useSigner()
    const { data: vaultsCount, isError: errorVaultsCount, isLoading: isLoadingVaultsCount } = VaultsCount()

    const vaults = AllVaults(vaultsCount as number)
    const contractConfig = {
        address: goerliLiquidationPairFactoryAddress,
        abi: createPairAbi,
        signerOrProvider: signer,
        functionName: 'createPair',
    }
    // @ts-ignore
    const [selectedVault, setSelectedVault] : vaultData = useState();
    // @ts-ignore
    const { write: createLiquidationPair, error: createLiquidationPairError, isError: isClaimError , isSuccess: success,  data: addressLiquidationPair} = useContractWrite(contractConfig)
    function handleSubmit(event: { preventDefault: () => void; target: HTMLFormElement | undefined; }) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const source = formData.get('source');
        const tokenIn = formData.get('token-in');
        // @ts-ignore
        const tokenOut = (formData.get('token-out')).split(":");
        const swapMultiplier = formData.get('swap-multiplier');
        const liquidationFraction = formData.get('liquidation-fraction');
        const reserveIn = formData.get('virtual-reserve-in');
        const reserveOut = formData.get('virtual-reserve-out');

        if (createLiquidationPair != undefined) {
            createLiquidationPair({ recklesslySetUnpreparedArgs: [source, tokenIn, tokenOut[1].trim(), swapMultiplier, liquidationFraction, reserveIn, reserveOut] })
        }
    }

    function handleVaultChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const vaultAddress : vaultData = event.target.value as unknown as vaultData;
        setSelectedVault(vaultAddress);
        // @ts-ignore
        const getVault = vaultMap.get(vaultAddress)
        // @ts-ignore
        document.getElementById("grid-token-out").value = getVault.assetSymbol + " : " + getVault.addressAsset;
    }



    return (
        <form
            // @ts-ignore
            onSubmit={handleSubmit}
            className="w-full max-w-lg px-8 pt-4 pb-8 z-20 "
        >
            <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-source"
                    >
                        Source (Vault)
                    </label>
                    <select
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-source"
                        name="source"
                        required={true}
                        onChange={(e) => {handleVaultChange(e)}}
                    >
                        <option disabled selected value="">Select a vault</option>
                        {vaults && vaults.length > 0 && vaults.map((vault) => (
                            <option key={vault.address} value={vault.address}>{vault.name} : {vault.address}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-token-in"
                    >
                        Token In (POOL)
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-token-in"
                        name="token-in"
                        type="text"
                        value="0xFfF6e20deb5cC0E66Bc697eB779f7a884ecFaB5d"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-token-out"
                    >
                        Token Out (Token vault)
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-token-out"
                        name="token-out"
                        type="text"
                        required={true}
                    />
                </div>

            </div>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3  mb-4">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-swap-multiplier"
                    >
                        Swap Multiplier
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-swap-multiplier"
                        name="swap-multiplier"
                        type="text"
                        value="300000000"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4 ">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-liquidation-fraction"
                    >
                        Liquidation Fraction
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-liquidation-fraction"
                        name="liquidation-fraction"
                        type="text"
                        value="20000000"
                        required={true}
                    />
                </div>

            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 ">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-virtual-reserve-in"
                    >
                        Virtual Reserve In
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-virtual-reserve-in"
                        name="virtual-reserve-in"
                        type="text"
                        value="100000000000000000000"
                        required={true}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-virtual-reserve-out"
                    >
                        Virtual Reserve Out
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="grid-virtual-reserve-out"
                        name="virtual-reserve-out"
                        type="text"
                        value="50000000000000000000"
                        required={true}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button type={'submit'} className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
                    Create Pair
                </button>
            </div>
        </form>
    );
}