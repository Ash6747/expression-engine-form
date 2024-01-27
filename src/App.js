import './App.css';
import ExpressionEngineUI  from './components/DataForm';
import JSONViewer from './components/DataView';

function App() {
  return (
    <div className="App">
      <h1>Expression Engine Form</h1>
      <ExpressionEngineUI/>
      <JSONViewer/>
    </div>
  );
}

export default App;
