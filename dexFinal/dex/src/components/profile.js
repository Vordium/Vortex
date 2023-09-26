import './styles.css';
import fallbackAvatar from '../assets/Pastel200.png';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
  
  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
  
    if (isConnected) {
        const addressToShow = `${address.substring(0, 5)}....${address.substring(address.length - 5)}`;
    
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0e111b',
            padding: '10px',
            borderRadius: '10px',
          }}>
            <div style={{ marginRight: '10px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0e111b',
              }}>
                <img src={ensAvatar || fallbackAvatar} alt="ENS Avatar" style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '50%',
                }} />
              </div>
            </div>
            <div style={{ textTransform: 'capitalize', flex: '1', color: 'white' }}>
              {ensName ? `${ensName} (${addressToShow})` : addressToShow}
              <div style={{ color: '#1f2639' }}>
                Connected to {connector ? connector.name : "undefined"}
              </div>
              <button onClick={disconnect} style={{ marginTop: '10px', cursor: 'pointer', padding: '5px 10px', backgroundColor: '#1f2639', color: 'white', border: 'none', borderRadius: '5px' }}>
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
  