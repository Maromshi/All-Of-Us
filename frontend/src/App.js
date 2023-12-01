import "./App.css";
import { Route } from "react-router-dom";
import HompePage from "./Pages/HompePage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      {/* exact is to avoid both Rotes render together */}
      <Route path="/" component={HompePage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
