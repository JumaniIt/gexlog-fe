import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react';
import ContactForm from "../ContactForm";

const Banner = ({ className, title, description, img }) => {
  return (
    <div className={`banner ${className}`}>
      <div className="banner-bg" style={{ backgroundImage: `url(${img})` }}>
        <div className="banner-bg--left">
          <h2 className="banner-title">{title}</h2>
          <p className="banner-description">{description}</p>
        </div>
        <div className="banner-bg--right">
          <ContactForm className="banner-form-input"/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
