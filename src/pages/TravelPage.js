import React, { useState } from 'react';
import '../styles/TravelPage.scss';
import { Button, Input, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import TimeSlide from '../components/TimeSlide';
import { TRAVEL_PAGE_LOCATIONS } from '../data/travel-data';
import Carousel from '../components/Carousel';
import { useSpring, animated } from '@react-spring/web';

const menuItems = [
  { key: 1, label: 'News' },
  { key: 2, label: 'Destinations' },
  { key: 3, label: 'Blog' },
  { key: 4, label: 'Contact' }
];

export const TravelPage = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [locations, setLocations] = useState(TRAVEL_PAGE_LOCATIONS);

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      delay: 200
    }),
    []
  );

  const onActiveChange = (activeItem) => {
    setSelectedSlide(activeItem);
    api.start({
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 20 }
    });
  };

  return (
    <div className="travel-container" style={{ backgroundImage: `url(${locations[selectedSlide].background})` }}>
      <Layout className="layout">
        <Header className="header">
          <div className="demo-logo ">LOGO</div>
          <Menu className="nav" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
          <div className="profile">
            <div>
              <Button shape="circle" icon={<SearchOutlined color="black" />} />
            </div>
            <div>Hello, Truong!</div>
          </div>
        </Header>
        <Content className="content">
          <div className="left">
            <TimeSlide total={locations.length} active={selectedSlide} />
          </div>
          <div className="center">
            <animated.div style={props}>
              <h1>{locations[selectedSlide].name}</h1>
            </animated.div>

            <animated.div style={props}>
              <h3>{locations[selectedSlide].description}</h3>
            </animated.div>

            <div>
              <Button className="explore-btn" type="primary">
                Explore
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
          <div className="right">
            <Carousel data={locations.map((loc) => ({ id: loc.id, link: loc.thumbnail, name: loc.name }))} onActiveChange={onActiveChange} />
          </div>
        </Content>
        <Footer className="footer">Truong Nguyen - {new Date().getFullYear()}</Footer>
      </Layout>
    </div>
  );
};
