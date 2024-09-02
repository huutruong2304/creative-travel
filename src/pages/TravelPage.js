import React, { useState } from 'react';
import '../styles/TravelPage.scss';
import { Button, Input, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import TimeSlide from '../components/TimeSlide';
import { TRAVEL_PAGE_LOCATIONS } from '../data/travel-data';
import MyCarousel from '../components/MyCarousel';

const MenuItems = [
  { key: 1, label: 'News' },
  { key: 2, label: 'Destinations' },
  { key: 3, label: 'Blog' },
  { key: 4, label: 'Contact' }
];

export const TravelPage = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [locations, setLocations] = useState(TRAVEL_PAGE_LOCATIONS);

  const onActiveChange = (activeItem) => {
    console.log(activeItem);
    setSelectedSlide(activeItem);
  };

  return (
    <div className="travel-container" style={{ backgroundImage: `url(${locations[selectedSlide].background})` }}>
      <Layout className="layout">
        <Header className="header">
          <div className="demo-logo ">LOGO</div>
          <Menu className="nav" theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={MenuItems} />
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
            <h1>{locations[selectedSlide].name}</h1>
            <h3>{locations[selectedSlide].description}</h3>
            <div>
              <Button className="explore-btn" type="primary">
                Explore
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
          <div className="right">
            <MyCarousel data={locations.map((loc) => ({ id: loc.id, link: loc.thumbnail, name: loc.name }))} onActiveChange={onActiveChange} />
          </div>
        </Content>
        <Footer className="footer">Truong Nguyen - {new Date().getFullYear()}</Footer>
      </Layout>
    </div>
  );
};
