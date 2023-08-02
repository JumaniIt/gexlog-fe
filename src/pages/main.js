import React from 'react';
import { Text } from '@chakra-ui/react';
import logo from "../gexlog-logo.svg";
import bannerImage from "../banner-image-2.jpg";
import Header from '../components/Header/header';
import Banner from '../components/Banner/banner';
import ImageText from '../components/ImageText/imageText';
import Footer from '../components/Footer/footer';

const Main = () => {
  return (
    <div className="main-page main-page__container">
      <Header img={logo} className="main-page__header" />
      <div className="main-page__content">
        <Banner className="main-page__banner" title="Prestación de servicios de logística aduanera" img={bannerImage} description="Gex Logística provee soluciones integrales que responden a una amplia experiencia en el sector." />
        <div className="main-page__cards">
          <ImageText />
        </div>
      </div>
      <Footer className="main-page__footer" />
    </div>
  )
};

export default Main;