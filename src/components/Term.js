import logo from '../assets/logo.svg';
import './../Term.css';
import FloatGui from './FloatGui';
function App() {
  return (
    <div >
      <div className="App">
        <header className="App-header">
          <div className="term-outline">
            <FloatGui linkto="/gui" />

          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
