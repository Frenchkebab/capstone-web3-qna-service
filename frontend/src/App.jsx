import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <div className="main">
      <WalletProvider>
        <div className="container">
          <Navbar />
          <div>
            {/* <GreeterProvider>
              <Greeter />
            </GreeterProvider> */}
          </div>
          <Footer />
        </div>
      </WalletProvider>
    </div>
  );
}

export default App;
