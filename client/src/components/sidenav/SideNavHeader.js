import React, { Component } from "react";

class SideNavHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { firstName, lastName, title, avatar } = this.props;
    let navHeader;

    if (avatar) {
      navHeader = (
        <div className="navHeader">
          <div className="navHeaderImgDiv">
            <img id="navHeaderImg" src={avatar} alt="" />
          </div>
          <div className="navHeaderText">
            {firstName} {lastName}
          </div>
          <div id="" className="navHeaderText">
            {title}
          </div>
        </div>
      );
    } else {
      navHeader = (
        <div className="navHeader">
          <div id="navHeaderName" className="navHeaderText">
            {firstName} {lastName}
          </div>
          <div id="navHeaderTitle" className="navHeaderText">
            {title}
          </div>
        </div>
      );
    }
    return navHeader;
  }
}

export default SideNavHeader;
