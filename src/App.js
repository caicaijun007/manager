import React, { PureComponent } from 'react';
import './app.less';

class App extends PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
