import Sidebar from "./Sidebar";
import Body from "./Body";
import styled from "styled-components";

const StyleAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;

function App() {
  return (
    <div className="App">
      <StyleAppContainer>
        <Sidebar />
        <Body />
      </StyleAppContainer>
    </div>
  );
}

export default App;
