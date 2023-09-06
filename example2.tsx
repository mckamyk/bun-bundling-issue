import {WagmiConfig, createConfig, configureChains, mainnet} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import { useConnect } from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'

const {chains, publicClient} = configureChains([mainnet], [publicProvider()])

// Idk why we're getting the elusive type error here
// It doesn't show up in my original repo, and doesn't seem to affect build output
export const config = createConfig({
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "injected",
      }
    })
  ]
})

const Wrapped = () => {
  return (
    <WagmiConfig config={config}>
      <Button />
    </WagmiConfig>
  )
}

const Button = () => {
  const {connect, connectors} = useConnect()
  const connector = connectors[0]

  return (
    <button disabled={!connector.ready} onClick={() => connect({connector})}>{connector.name}</button>
  )
}

export default Wrapped

