import React from 'react';
import './App.css';

function App() {
  const [whatIWant, setWhatIWant] = React.useState([]);
  const [whatIHave, setWhatIHave] = React.useState([]);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((data) => {
        setWhatIWant(data);
      });
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setWhatIHave(data);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h3>What I want:</h3>
          <pre>{JSON.stringify(whatIWant, null, 2)}</pre>
        </div>
        <div>
          <h3>What I have:</h3>
          <pre>{JSON.stringify(whatIHave, null, 2)}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
