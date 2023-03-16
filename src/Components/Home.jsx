import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase";
import SurveyCard from "./SurveyCard";
import {
  SimpleGrid,
  Center,
  Box,
  Text,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export async function getPromisesSurveys() {
  const querySsurveys = await getDocs(collection(db, "surveys"));
  const docsArray = [];
  querySsurveys.forEach((d) => docsArray.push(d.data()));
  // console.log("DOCS ARRAY", docsArray);
  return docsArray;
}

export default function Home() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  // console.log("SURVEYS STATE", surveys);

  function handlerSetFlag() {
    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  useEffect(() => {
    let surveys = [];
    async function getSurvey() {
      surveys = await getPromisesSurveys();
      setSurveys(surveys);
    }
    getSurvey();
  }, []);

  useEffect(() => {
    if (surveys.length >= 1) {
      setLoading(false);
    }
  }, [surveys]);

  useEffect(() => {}, [loading]);

  useEffect(() => {}, [flag]);

  return (
    <Center display={"flex"} flexDirection={"column"}>
      <Box
        background={"orange.100"}
        borderRadius={10}
        padding={3}
        marginTop={3}
      >
        <Text
          color={"blackAlpha.600"}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          textAlign={"center"}
          justifyContent={"center"}
        >
          Puedes completar encuestas y ver los resultados
        </Text>
      </Box>

      <Link to="/createSurveys">
        <Button margin={5}>Hacer una encuesta</Button>
      </Link>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={12} marginTop={5}>
        {surveys?.map((sur, idx) => (
          <SurveyCard
            key={idx}
            full_name={sur.full_name}
            email={sur.email}
            birth_date={sur.birth_date}
            country_of_origin={sur.country_of_origin}
          ></SurveyCard>
        ))}
      </SimpleGrid>
    </Center>
  );
}
