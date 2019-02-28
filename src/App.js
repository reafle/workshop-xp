import React from 'react';
import styled from 'styled-components';
import Description from './components/Description';
import Scene from './components/Scene';

const StyledScene = styled.div`
  flex: 2;
`;

const StyledDescription = styled.div`
  flex: 1;
`;

const StyledApp = styled.div`
  display: flex;
`;

const App = () => (
  <StyledApp>
    <StyledScene>
      <Scene
        gridSize={86}
        updatesPerSecond={50}
      />
    </StyledScene>
    <StyledDescription>
      <Description />
    </StyledDescription>
  </StyledApp>
);

export default App;
