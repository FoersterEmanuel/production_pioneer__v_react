import Header from './header/Header';
import IncrementSelectors from './incrementSelectors/IncrementSelectors';
import Main from './main/Main';
import Footer from './footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App_header">
        <Header/>
      </header>
      <aside className="App_aside">
        <IncrementSelectors/>
      </aside>
      <main className="App_main">
        <Main/>
      </main>
      <footer className="App_footer">
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
