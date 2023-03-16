import React from "react";
import {
  Text,
  Card,
  Divider,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

export default function SurveyCard({
  full_name,
  birth_date,
  email,
  country_of_origin,
}) {
  // console.log("SURVEY CARD", full_name);
  return (
    <Card background={"blue.100"} align="center">
      <CardHeader>
        <Text>Nombre y apellido: {full_name}</Text>
      </CardHeader>
      <Divider h="0.2rem" bg="brand.green.100" mt="1rem" />
      <CardBody>
        <Text>Email: {email}</Text>
      </CardBody>
      <Divider h="0.2rem" bg="brand.green.100" mt="1rem" />
      <CardBody>
        <Text>Fecha de Nacimiento: {birth_date}</Text>
      </CardBody>
      <Divider h="0.2rem" bg="brand.green.100" mt="1rem" />
      <CardBody>
        <Text>País de origen: {country_of_origin}</Text>
      </CardBody>
    </Card>
  );
}
