import reactLogo from "./assets/react.svg";
import "./App.css";
import ServerSide from "./components/ServerSide";
import ClientSide from "./components/ClientSide";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <hr></hr>
      <div>
        <h1>Counter Challenge Server Side Communication</h1>
      </div>

      <div>
        <ServerSide />
      </div>
      <hr style={{ marginTop: "150px" }}></hr>
      <div>
        <h1>Counter Challenge Client Side Communication</h1>
      </div>

      <div>
        <ClientSide />
      </div>
    </div>
  );
}

export default App;
