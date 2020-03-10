import React from 'react';
import './App.css';
import Table from "./components/Table";


const App = () =>

    (<div style={{ width: 'max-content' }}>
      <Table x={parseInt(window.numRows)} y={parseInt(window.numCols)} id={window.token} />
    </div> )

export default App;