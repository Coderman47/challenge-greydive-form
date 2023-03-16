import React, { useEffect } from "react";
import {
  Flex,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import addSurvey from "../utils/AddSurvey";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase";
import { async } from "@firebase/util";

export default function SurveysForm() {
  const navigate = useNavigate();

  let countries = [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Mexico",
    "Perú",
    "Uruguay",
    "Venezuela",
  ];

  const [input, setInput] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: false,
  });
  console.log("INPUT STATE", input);
  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: "",
  });
  console.log("ERROR STATE", errors);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  let emailExist = false;

  async function validateSubmit() {
    // console.log("ENTRE");
    const querySurveys = await getDocs(collection(db, "surveys"));

    querySurveys.forEach((d) => {
      if (d.data().email === input.email) {
        emailExist = true;
      }
    });

    // console.log("EXISTE?", emailExist);
    if (input.full_name === "") {
      errors.full_name = "Campo requerido";
    }
    if (input.email === "") {
      errors.email = "Email vacio";
      console.log("EMAIL vacio", errors);
    } else if (emailExist) {
      errors.email = "Este email ya está en uso";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
    ) {
      errors.email = "email invalido";
    } else {
      errors.email = "";
    }
    if (input.country_of_origin === "") {
      errors.country_of_origin = "Selecciona tu pais de origen";
    } else {
      errors.country_of_origin = "";
    }
    if (input.terms_and_conditions === false) {
      errors.terms_and_conditions =
        "Se debe aceptar los términos y condiciones";
    } else {
      errors.terms_and_conditions = "";
    }
    return errors;
  }

  function validate() {
    if (input.full_name === "") {
      errors.full_name = "Campo requerido";
    } else if (input.full_name.length > 25) {
      errors.full_name = "Máximo de carácteres permitido";
    } else {
      errors.full_name = "";
    }
    if (input.email === "") {
      errors.email = "Debes ingresar tu correo electrónico";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
    ) {
      errors.email = "El formato de email es inválido";
    } else {
      errors.email = "";
    }
    if (input.birth_date === "") {
      errors.birth_date = "Falta elegir tu fecha de nacimiento";
    } else {
      errors.birth_date = "";
    }
    if (input.country_of_origin === "") {
      errors.country_of_origin = "Selecciona tu pais de origen";
    } else {
      errors.country_of_origin = "";
    }
    if (input.terms_and_conditions === false) {
      errors.terms_and_conditions = "";
    } else {
      errors.terms_and_conditions = "Debes aceptar";
    }
    // console.log("FIN VALIDATE");
    return errors;
  }

  function handlerFlag() {
    // console.log("ENTRE AL FLAG")
    if (flag === false) {
      setFlag(true);
      console.log("FLAG TRUE", flag);
    } else {
      setFlag(false);
      console.log("FLAG FALSE", flag);
    }
  }

  function handlerChange(e) {
    e.preventDefault();

    setErrors(validate());
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setTimeout(() => {
      handlerFlag();
    }, 200);
  }

  function handlerCheckbox(e) {
    e.preventDefault();

    setErrors(validate());
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (input.terms_and_conditions === false) {
      setInput({
        ...input,
        terms_and_conditions: true,
      });
    } else {
      setInput({
        ...input,
        terms_and_conditions: false,
      });
    }
    setTimeout(() => {
      handlerFlag();
    }, 200);
  }

  function handlerSubmit(e) {
    e.preventDefault();

    setLoading(true);
    alert("¡Muchas gracias por completar la encuesta!");

    console.log("ENTRE HANDLER SUBMIT");
    validateSubmit();

    setTimeout(() => {
      console.log("ENTRE AL TIMERMAN");
      if (
        errors.email === "" &&
        errors.full_name === "" &&
        errors.birth_date === "" &&
        errors.terms_and_conditions === "" &&
        errors.country_of_origin === ""
      ) {
        setLoading(false);
        console.log("NO HAY ERRORS", errors);
        console.log("loading false", loading);
        addSurvey(input);
        setInput({
          full_name: "",
          email: "",
          birth_date: "",
          country_of_origin: "",
          terms_and_conditions: false,
        });
        alert("¡Encuesta completada satisfactoriamente!")
      } else {
        setLoading(false);
        console.log("SI HAY ERRORS", errors);
        console.log("loading also false", loading);
        alert("Uno o varios campos contienen un error");
      }
    }, 1500);
  }

  function isCompleteForm() {
    let isComplete;
    if (
      input.full_name &&
      input.birth_date &&
      input.country_of_origin &&
      input.email &&
      input.terms_and_conditions
    ) {
      return (isComplete = true);
    }
  }

  // useEffect(() => {
  //   setInput({
  //     ...input,
  //   });
  //   console.log("render INPUTS")
  // }, [input]);

  useEffect(() => {
    // console.log("render SURVEYS")
  }, [flag]);

  useEffect(() => {
    // console.log("render ERROR")
  }, [errors]);

  return (
    <form>
      {loading ? (
        <Center>
          <Flex
            bg={"yellow.100"}
            borderRadius={10}
            marginTop={100}
          >
            <Center>
              <Box
                color={"blackAlpha.700"}
                alignItems={"center"}
                paddingY={200}
                paddingX={10}
              >
                <Text
                  fontWeight={700}
                  lineHeight={1.2}
                  fontSize={50}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  Verificando encuesta. Espere un momento...
                </Text>
              </Box>
            </Center>
          </Flex>
        </Center>
      ) : (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="brand.green.200"
          background={"yellow.100"}
        >
          <Box background={"yellow.400"} boxSize={"auto"} borderRadius={10}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Box p={2} borderRadius={10}>
                <Box>
                  <FormControl id="full_name" isRequired>
                    <FormLabel textAlign={"center"}>Nombre completo</FormLabel>
                    <Input
                      name="full_name"
                      value={input.full_name}
                      onChange={(e) => handlerChange(e)}
                    />
                  </FormControl>
                  {errors.full_name ? (
                    <Text textAlign={"center"} color={"red"}>
                      {errors.full_name}
                    </Text>
                  ) : null}
                </Box>

                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel textAlign={"center"}>Email</FormLabel>
                    <Input
                      name="email"
                      value={input.email}
                      onChange={(e) => handlerChange(e)}
                    />
                    <FormHelperText
                      backgroundColor={"blackAlpha.100"}
                      width={"fit-content"}
                      padding={1}
                      borderRadius={5}
                      color={"purple.600"}
                    >
                      ejemplo99@gmail.com
                    </FormHelperText>
                    {errors.email ? (
                      <Text textAlign={"center"} color={"red"}>
                        {errors.email}
                      </Text>
                    ) : null}
                  </FormControl>
                </Box>
              </Box>

              <Box>
                <FormControl id="birth_date" isRequired>
                  <FormLabel textAlign={"center"}>
                    Fecha de nacimiento
                  </FormLabel>
                  <Input
                    name="birth_date"
                    type="date"
                    value={input.birth_date}
                    onChange={(e) => handlerChange(e)}
                  />
                </FormControl>
                {errors.birth_date ? (
                  <Text textAlign={"center"} color={"red"}>
                    {errors.birth_date}
                  </Text>
                ) : null}
              </Box>

              <Box>
                <FormControl id="country_of_origin" isRequired>
                  <FormLabel textAlign={"center"}>País de origen</FormLabel>
                  <Select
                    placeholder="Elige un país"
                    focusBorderColor={"brand.green.300"}
                    fontFamily={"body"}
                    name="country_of_origin"
                    value={input.country_of_origin}
                    onChange={(e) => handlerChange(e)}
                  >
                    {countries.map((country, idx) => (
                      <option key={idx} value={country}>
                        {country}
                      </option>
                    ))}
                  </Select>
                  {errors.country_of_origin ? (
                    <Text textAlign={"center"} color={"red"}>
                      {errors.country_of_origin}
                    </Text>
                  ) : null}
                </FormControl>
              </Box>

              <Box bg={"purple.50"} borderRadius={5} padding={2}>
                <FormControl id="terms_and_conditions" isRequired>
                  <FormLabel fontWeight={700}>
                    Aceptar Términos y Condiciones
                  </FormLabel>
                  <input
                    type="checkbox"
                    name="terms_and_conditions"
                    value={input.terms_and_conditions}
                    onChange={(e) => handlerCheckbox(e)}
                    checked={input.terms_and_conditions}
                  />
                  {errors.terms_and_conditions !== "" ? (
                    <Text textAlign={"center"} color={"red"}>
                      {errors.terms_and_conditions}
                    </Text>
                  ) : null}
                </FormControl>
              </Box>

              <Button
                onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
                loadingText="post survey"
                fontFamily={"body"}
                size="lg"
                width={200}
                fontSize={"1.3rem"}
                bg={"yellow.50"}
                color={"black"}
                alignSelf={"center"}
                alignItems={"center"}
                _hover={{
                  bg: "orange.400",
                  color: "cyan.50",
                }}
                // isDisabled={!isCompleteForm()}
              >
                Enviar encuesta
              </Button>
              <Button
                fontFamily={"body"}
                bg="base.green.100"
                fontSize={"1.2rem"}
                color={"orange.900"}
                _hover={{
                  color: "yellow.50",
                }}
                Text="0"
                mr="1rem"
                onClick={() => navigate("/")}
              >
                Ver respuestas
              </Button>
            </Stack>
          </Box>
        </Flex>
      )}
    </form>
  );
}
