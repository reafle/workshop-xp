/* eslint no-use-before-define: 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import Controls from './Controls';

const CanvasWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

class Scene extends Component {
  state = {
    screen: {
      width: 1,
      height: 1,
      ratio: window.devicePixelRatio || 1,
    },
    context: null,
    running: false,
    step: false,
    data: [], // TODO: implement the data model of your choice
  };


  constructor(props) {
    super(props);

    this.cellSize = 10;
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { gridSize } = this.props;
    const { screen } = this.state;

    this.setState({
      screen: {
        ...screen,
        width: this.cellSize * gridSize,
        height: this.cellSize * gridSize,
      },
    });

    const context = this.canvasRef.current.getContext('2d');
    this.setState({ context });
    this.handleClear();
    requestAnimationFrame(() => { this.renderUpdate(); });
  }

  renderSceneLoaded = () => {
    const { context, screen } = this.state;

    // draws Background
    context.fillStyle = '#000';
    context.fillRect(0, 0, screen.width, screen.height);
  }

  renderGrid = () => {
    // draws Gridlines
    const { context, screen } = this.state;

    context.strokeStyle = '#777';
    let i;
    i = screen.width;

    /* eslint-disable */
    do {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, screen.height);
      context.closePath();
      context.stroke();
    } while ((i -= this.cellSize) > 0);

    i = screen.height;
    do {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(screen.width, i);
      context.closePath();
      context.stroke();
    } while ((i -= this.cellSize) > 0);
    /* eslint-enable */
  }

  renderUpdate = () => {
    const { context, screen } = this.state;
    const { updatesPerSecond } = this.props;

    context.scale(screen.ratio, screen.ratio);

    this.renderSceneLoaded();

    // TODO: implement the display and evolution of the current generation of life

    this.renderGrid();

    // Next frame
    setTimeout(
      () => requestAnimationFrame(() => { this.renderUpdate(); }),
      1000 / updatesPerSecond,
    );
  }

  handleStartStop = (running) => () => {
    this.setState({ running });
  }

  handleStep = () => {
    this.setState({ step: true });
  }

  handleSeed = () => {
    const { gridSize } = this.props;
    const data = [];

    // Random
    let i = gridSize;
    /* eslint-disable */
    while ((i -= this.cellSize)) {
      data.splice(0, 0, Array.from({ length: gridSize }, () => ((Math.random() * 10 | 0) > 5)));
    }
    /* eslint-enable */

    this.setState({ data });
  }

  updateData = () => {
    const { data } = this.state;

    const newData = JSON.parse(JSON.stringify(data));

    // TODO: implement the next generation evolution logic. See the rules in the aside

    this.setState({
      data: newData,
      step: false,
    });
  }

  handleClear = () => {
    // TODO: implement removing all life event handler
  };

  handleClick = (event) => {
    const x = event.pageX - this.canvasRef.current.offsetLeft;
    const y = event.pageY - this.canvasRef.current.offsetTop;

    const square = [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)];
    console.log(`clicked at (${square[0]}, ${square[1]})`);

    // TODO: implement setting the life in the clicked cell
  }


  render() {
    const { screen: { width, height, ratio }, running } = this.state;

    return (
      <div>
        <Controls
          onSeed={this.handleSeed}
          onStep={this.handleStep}
          onClear={this.handleClear}
          toggleStartStop={this.handleStartStop}
          running={running}
        />
        <CanvasWrapper>
          <canvas
            ref={this.canvasRef}
            width={width * ratio}
            height={height * ratio}
            onClick={this.handleClick}
          />
        </CanvasWrapper>
      </div>
    );
  }
}

Scene.propTypes = {
  gridSize: PropTypes.number,
  updatesPerSecond: PropTypes.number,
};

Scene.defaultProps = {
  gridSize: 64,
  updatesPerSecond: 10,
};

export default Scene;
