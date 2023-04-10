import { ConnectButton } from '@rainbow-me/rainbowkit'
import * as Tabs from '@radix-ui/react-tabs';

import {FormVaultFactory} from "../components/FormVaultFactory";
import {FormLiquidationPair} from "../components/FormLiquidationPair";

function VaultFactoryUI() {
  return (
    <>
        <body className="bg-gradient-to-br from-purple-700 via-violet-800 to-blue-900">
        <div className="absolute top-0 right-0 mt-5 mr-5">
            <ConnectButton  chainStatus="none" />
        </div>


        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-12 pb-5 text-white" >PoolTogether Vault Factory</h1>
            <Tabs.Root className="TabsRoot rounded-lg shadow-purple-500/100" defaultValue="tab1">
                <Tabs.List className="TabsList" aria-label="Vault Factory">
                    <Tabs.Trigger className="TabsTrigger" value="tab1">
                        Vault
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="tab2">
                        Liquidation Pair
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                    <p className="Text">Build your vault ! 🏦⚒️</p>
                    <FormVaultFactory  />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <p className="Text">Build your liquidation pair !</p>
                    <FormLiquidationPair  />
                </Tabs.Content>
            </Tabs.Root>
            </div>
        </body>
    </>
  )
}

export default VaultFactoryUI
