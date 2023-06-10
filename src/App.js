import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>My Notes</h1>
      </header>
      <NotesList />
    </div>
  );
}

export default App;
