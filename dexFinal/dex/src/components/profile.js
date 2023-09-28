import './styles.css';
import fallbackAvatar from '../assets/pastel.png';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi';
  
  
  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
  
    if (isConnected) {
        const addressToShow = `${address.substring(0, 3)}...${address.substring(address.length - 3)}`;
    
        return (
          <div className="container">
            <div className="avatar">
              <img src={ensAvatar || fallbackAvatar} alt="ENS Avatar" className="avatar-img" />
            </div>
            <div className="address">
              <div className="name">
                {ensName ? `${ensName}` : 'Unknown'}
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
            {connector.name}
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
  