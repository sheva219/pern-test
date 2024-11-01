import './App.css';
import DataTable from './components/DataTable';
import CreationPanel from './components/CreationPanel';

function App() {
  return (
    <div
      className="App"
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div>
        <DataTable />
        <CreationPanel />
      </div>
    </div>
  );
}

export default App;
