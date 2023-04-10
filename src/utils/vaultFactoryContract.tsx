
export const getVaults = [
    'function allVaults(uint256) public view returns (address)',
    'function totalVaults() external view returns (uint256)',
]
export const vaultFactoryABI = [  {
    "name": "deployVault",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
        {
            "type": "address",
            "name": "_asset",
            "internalType": "contract IERC20"
        },
        {
            "type": "string",
            "name": "_name",
            "internalType": "string"
        },
        {
            "type": "string",
            "name": "_symbol",
            "internalType": "string"
        },
        {
            "type": "address",
            "name": "_twabController",
            "internalType": "contract TwabController"
        },
        {
            "type": "address",
            "name": "_yieldVault",
            "internalType": "contract IERC4626"
        },
        {
            "type": "address",
            "name": "_prizePool",
            "internalType": "contract PrizePool"
        },
        {
            "type": "address",
            "name": "_claimer",
            "internalType": "contract Claimer"
        },
        {
            "type": "address",
            "name": "_owner",
            "internalType": "address"
        }
    ],
    "outputs": [
        {
            "type": "address",
            "name": "",
            "internalType": "address"
        }
    ]
}
]


const goerliVaultFactoryAddress = '0x7383eA6Ec9a5C2e39BB0860E1e3Ee1d62572B8D3'


export { goerliVaultFactoryAddress}

//export const GoerliVaultFactoryContract = new ethers.Contract(goerliVaultFactoryAddress, vaultFactoryABI, PROVIDERS.ETHEREUM)



