import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styled from 'styled-components';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';


import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

const BaseContainer = props =>
    <div
        style={{
            display: 'flex',
            alignContent: 'left',
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: '100vh',
            paddingBottom: 16,
            fontFamily: 'Roboto',
            width: 240,
            ...props.style

        }}
    >
        {props.children}
    </div>;

class Navbar extends Component {

render() {
    return (
        <div id='sideNavWrapper'>
            <div style={{padding: 16, background: '#006400', textAlign: 'center' }}>
                <div style={{ display: 'inline',width: 40, height: 40 }}>
                    <img
                        src="https://avatars1.githubusercontent.com/u/17460785?s=400&u=d8b0d093c1d4ad51c2700d15cdf3898cdee42006&v=4"
                        style={{ borderRadius: '30px', width: 40, height: 40 }}
                    />
                </div>
                <div style={{paddingLeft: 6, paddingTop: 6 }}>
                    <div style={{ fontSize: 12, color: '#fff' }}>
                        USERS NAME{/* {' '}{USER.NAME}{' '} */}
                    </div>
                    <div style={{ fontSize: 11, color: '#fff' }}>USERS TITLE</div>
                </div>
            </div>
            <SideNav
                hoverBgColor="#006400"
                hoverColor="#fff"
                highlightBgColor="#006400"
                defaultSelected="products"
                highlightColor="#FFF"
            >
                <div />
                <Nav id="dashboard">
                    <NavIcon><Icon20 icon={ic_aspect_ratio} /></NavIcon>
                    <NavText> Dashboard </NavText>
                </Nav>

                <Nav id="products">
                    <NavIcon><Icon20 icon={ic_business_center} /></NavIcon>
                    <NavText> Products </NavText>
                </Nav>
                <Nav id="orders">
                    <NavIcon><Icon20 icon={ic_format_list_bulleted} /></NavIcon>
                    <NavText>
                        {' '}<span style={{ paddingRight: 6 }}>Orders</span>{' '}
                 </NavText>
                </Nav>

                <Nav id="customers">
                    <NavIcon><Icon20 icon={ic_people} /></NavIcon>
                    <NavText> Customers </NavText>
                    <Nav id="dashboard2">
                        <NavIcon><Icon20 size={16} icon={ic_aspect_ratio} /></NavIcon>
                        <NavText> Search </NavText>
                    </Nav>
                    <Nav
                        id="sales2"
                        onNavClick={() => {
                            console.log('Promote clicked!', arguments);
                        }}
                    >
                        <NavIcon><Icon20 size={16} icon={ic_business} /></NavIcon>
                        <NavText> Promote </NavText>
                    </Nav>
                    <Nav id="products2">
                        <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                        <NavText> Social Media </NavText>
                    </Nav>
                </Nav>
                <Nav
                    id="sales"
                    onNavClick={() => {
                        console.log('Sales clicked!', arguments);
                    }}
                >
                    <NavIcon><Icon20 icon={ic_business} /></NavIcon><NavText> Sales </NavText>
                </Nav>
                <Nav id="deliveries">
                    <NavIcon><Icon20 icon={ic_shopping_cart} /></NavIcon>
                    <NavText> Deliveries </NavText>
                </Nav>
            </SideNav>
        </div>
    );
}

}

export default Navbar;