import logo from '../assets/logo.svg';
import './../index.css';
import FloatGui from './FloatGui';
import TermInputLine from './TermInputLine';
function Term() {
  return (
    <div >
      <div className="App">
        <header className="App-header">
          <div className="term-outline unselectable">
            <FloatGui linkto="/gui" />
            <TermInputLine/>

                      </div>
        </header>
      </div>
    </div>
  );

}

export default Term;
