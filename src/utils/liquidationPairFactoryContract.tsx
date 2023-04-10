

export const createPairAbi = [  {
    "inputs": [
        {
            "internalType": "contract ILiquidationSource",
            "name": "_source",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_tokenIn",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_tokenOut",
            "type": "address"
        },
        {
            "internalType": "struct UFixed32x9",
            "name": "_swapMultiplier",
            "type": "uint32"
        },
        {
            "internalType": "struct UFixed32x9",
            "name": "_liquidityFraction",
            "type": "uint32"
        },
        {
            "internalType": "uint128",
            "name": "_virtualReserveIn",
            "type": "uint128"
        },
        {
            "internalType": "uint128",
            "name": "_virtualReserveOut",
            "type": "uint128"
        }
        ],
    "name": "createPair",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
]


const goerliLiquidationPairFactoryAddress = '0x01AA21a8228Be82632202F96f0d556Bc33Db2ec6'


export { goerliLiquidationPairFactoryAddress}

//export const GoerliVaultFactoryContract = new ethers.Contract(goerliLiquidationPairFactoryAddress, vaultFactoryABI, PROVIDERS.ETHEREUM)



