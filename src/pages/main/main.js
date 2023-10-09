import React, { useState } from "react";
import logo from "../../gexlog-logo.svg";
import bannerImage from "../../banner-image-2.jpg";
import imageSrc from "../../web-image.jpg";
import Header from "../../components/Header/header";
import Banner from "../../components/Banner/banner";
import Footer from "../../components/Footer/footer";
import CardSection from "../../components/Cards/cards";
import ImageText from "../../components/ImageText/image-text";
import TextSection from "../../components/TextSection/text-section";

import { bannerContent } from "../content/main/banner";
import { cardsContent } from "../content/main/cards";
import { imageTextContent } from "../content/main/imagetText";
import { contactText } from "../content/main/contact";
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    window.open("https://operaciones-1-0-0.d1abprr6ax9ina.amplifyapp.com");
  };

  return (
    <ChakraProvider>
      <div className="main-page main-page__container">
        <Header
          img={logo}
          className="main-page__header"
          onLoginClick={onLoginClick}
        />
        <div className="main-page__content">
          <Banner
            className="main-page__banner"
            title={bannerContent.title}
            img={bannerImage}
            description={bannerContent.description}
          />
          <CardSection
            className="main-page__cards"
            title="Servicios"
            cardContent={cardsContent}
          />
          <ImageText
            title="Plataforma web de gestión"
            text={imageTextContent.text}
            itemsList={imageTextContent.itemsList}
            img={imageSrc}
          />
          <TextSection
            title="Contacto"
            sectionId="contact-section"
            {...contactText}
          />
        </div>
        <Footer className="main-page__footer" />
      </div>
    </ChakraProvider>
  );
};

export default Main;
