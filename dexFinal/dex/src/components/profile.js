import './styles.css';
import fallbackAvatar from '../assets/pastel.png';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi';
  import metamaskLogo from '../assets/metamask-logo.png'; // Replace with the actual image path
  import coinbaseWalletLogo from '../assets/coinbase-wallet-logo.png'; // Replace with the actual image path
  import walletConnectLogo from '../assets/wallet-connect-logo.png'; // Replace with the actual image path
  import injectedConnectorLogo from '../assets/injected-connector-logo.png'; // Replace with the actual image path
  
  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()

    const connectorImages = {
        MetaMask: metamaskLogo,
        Coinbase: coinbaseWalletLogo,
        WalletConnect: walletConnectLogo,
        Injected: injectedConnectorLogo,
      };
  
    if (isConnected) {
        const addressToShow = `${address.substring(0, 3)}...${address.substring(address.length - 3)}`;
    
        return (
          <div className="container">
            <div className="avatar">
              <img src={ensAvatar || fallbackAvatar} alt="ENS Avatar" className="avatar-img" />
            </div>
            <div className="address">
              <div className="name">
                {ensName ? `${ensName}` : 'NoEns'}
              </div>
              <div className="address-text">
                {addressToShow}
              </div>
            </div>
            <div className="disconnect">
              <button onClick={disconnect} className="disconnect-button">
                Disconnect
              </button>
            </div>
          </div>
        )
      }
  
    return (
        <div>
    {connectors.map((connector) => (
  <button
    className="connect-button" // Apply the connect-button class
    disabled={!connector.ready}
    key={connector.id}
    onClick={() => connect({ connector })}
  >
    <div className="connector-content">
      <img src={connectorImages[connector.name]} alt={connector.name} className="connector-img" />
      <span className="connector-name">{connector.name}</span>
    </div>
    {!connector.ready && ' (unsupported)'}
    {isLoading &&
      connector.id === pendingConnector?.id &&
      ' (connecting)'}
  </button>
))}

    {error && <div className="error">{error.message}</div>}
  </div>
    )
  }
  