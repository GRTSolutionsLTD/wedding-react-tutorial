import React from 'react';
class Popup extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="popup-backdrop">
        <div className="popup">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Popup;