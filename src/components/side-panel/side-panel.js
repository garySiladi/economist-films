// @flow
import React from 'react';
import './side-panel.css';

class SidePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
    (this: any).handleClick = this.handleClick.bind(this);
  }
  state: {
    isExpanded: boolean,
  };
  props: {
    user: {
      id: number,
      name: string,
      imgUrl: string,
    }
  };

  handleClick() {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    const classname = `side-panel ${this.state.isExpanded ? 'side-panel--expanded' : ''}`;
    return (
      <div className={classname}>
        <ul className="side-panel__option-list">
          <li className="side-panel__option">
            <button
              className="temp-icon activator"
              onClick={this.handleClick}
            >
              {this.props.user.imgUrl + this.props.user.id}
            </button>
            <span className="side-panel__option-title">{this.props.user.name}</span>
          </li>
          <li className="side-panel__option side-panel__option--active">
            <button className="temp-icon" />
            <span className="side-panel__option-title">Search</span>
          </li>
          <li className="side-panel__option">
            <button className="temp-icon" />
            <span className="side-panel__option-title">Home</span>
          </li>
          <li className="side-panel__option">
            <button className="temp-icon" />
            <span className="side-panel__option-title">Favorites</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default SidePanel;
