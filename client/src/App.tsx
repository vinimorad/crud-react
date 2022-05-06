import { DashBoard } from "./components/DashBoard";
import { Header } from "./components/Header";
import { GlobalStyles } from "./components/styles/GlobalStyles";

export function App() {
  return (
    <div className="App">
      <Header/>
      <DashBoard/>
      <GlobalStyles/>
    </div>
  );
}


