import React from 'react';

const GameStopped = () => {
  return (
    <div className="instructions">
      <table>
        <tbody>
          <tr>
            <td><code>Z</code></td>
            <td>Rotate Left</td>
          </tr>
          <tr>
            <td><code>&uarr;</code></td>
            <td>Rotate Right</td>
          </tr>
          <tr>
            <td><code>&larr;</code></td>
            <td>Move Left</td>
          </tr>
          <tr>
            <td><code>&rarr;</code></td>
            <td>Move Left</td>
          </tr>
        </tbody>
      </table>

      <p>Press any key to start</p>
    </div>
  );
}

export default GameStopped;
