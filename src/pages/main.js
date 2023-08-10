import React from 'react';
import logo from "../gexlog-logo.svg";
import bannerImage from "../banner-image-2.jpg";
import Header from '../components/Header/header';
import Banner from '../components/Banner/banner';
import Footer from '../components/Footer/footer';
import CardSection from '../components/Cards/card';

import { cardsContent } from './content/main/cards';
import { bannerContent } from './content/main/banner';

const Main = () => {
  return (
    <div className="main-page main-page__container">
      <Header img={logo} className="main-page__header" />
      <div className="main-page__content">
        <Banner className="main-page__banner" title={bannerContent.title} img={bannerImage} description={bannerContent.description} />
        <CardSection className="main-page__cards" cardContent={cardsContent} />
      </div>
      <Footer className="main-page__footer" />
    </div>
  )
};

export default Main;