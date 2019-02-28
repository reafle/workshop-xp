import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;

  * {
     margin-bottom: 5px;
  }
`;

// Here goes the obfuscated code explaining the rules
const Description = () => (
  <Wrapper>
    <div>
      <h2>Conway&#39;s Game of Life</h2>
      <p>Rules:</p>
      <ul>
        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
      </ul>
    </div>
  </Wrapper>
);


export default Description;
