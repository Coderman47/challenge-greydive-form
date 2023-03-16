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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import addSurvey from "../utils/AddSurvey";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase";

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
  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: "",
  });

  // console.log("INPUT", input);

  async function validate() {
    let emailExist = false;
    let usersFirebase = await getDocs(collection(db, "surveys"));

    usersFirebase.forEach((d) =>
      d.data().email === input.email ? (emailExist = true) : null
    );
    console.log("FIND EMAIL", emailExist);

    if (input.email === "") {
      errors.email = "Debes ingresar tu correo electrónico";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)
    ) {
      errors.email = "El formato de email es inválido";
    } else if (emailExist) {
      errors.email = `El correo '${input.email}' ya está en uso`;
    } else {
      errors.email = "";
    }
    // if (input.name === "") {
    //   errors.name = "Por favor ingresa tu nombre";
    // } else if (input.name.length > 18) {
    //   errors.name = "El nombre puede contener hasta 18 caracteres";
    // } else {
    //   errors.name = "";
    // }
    // if (input.surname === "") {
    //   errors.surname = "Por favor ingresa tu apellido";
    // } else if (input.surname.length > 22) {
    //   errors.surname = "El apellido puede contener hasta 22 caracteres";
    // } else {
    //   errors.surname = "";
    // }
    // if (input.phone === "") {
    //   errors.phone = "Por favor ingresa tu número de telefono";
    // } else if (!(input.phone.length >= 8 && input.phone.length <= 10)) {
    //   errors.phone = "El número debe tener entre 8 y 10 digitos";
    // } else {
    //   errors.phone = "";
    // }
    // if (input.password === "") {
    //   errors.password = "Debes ingresar tu contraseña";
    // } else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(input.password) ||
    //   input.password.length < 8 ||
    //   input.password.length > 16
    // ) {
    //   errors.password =
    //     "La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número.";
    // } else {
    //   errors.password = "";
    // }
  }
  validate();

  function handlerChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handlerCheckbox() {
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
  }

  function handlerSubmit(e) {
    e.preventDefault();

    addSurvey(input);
    alert("¡Muchas gracias por completar la encuesta!");
    setInput({
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
      terms_and_conditions: false,
    });
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

  useEffect(() => {
    setInput({
      ...input,
    });
  }, []);

  return (
    <form>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg="brand.green.200"
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box>
            <FormControl id="full_name" isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                name="full_name"
                value={input.full_name}
                onChange={(e) => handlerChange(e)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={input.email}
                onChange={(e) => handlerChange(e)}
              />
              <FormHelperText>ejemplo99@gmail.com</FormHelperText>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="birth_date" isRequired>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Input
                name="birth_date"
                type="date"
                value={input.birth_date}
                onChange={(e) => handlerChange(e)}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl id="country_of_origin" isRequired>
              <FormLabel>País de origen</FormLabel>
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
            </FormControl>
          </Box>

          <Box>
            <FormControl id="terms_and_conditions" isRequired>
              <FormLabel>Aceptar Términos y Condiciones</FormLabel>
              <input
                type="checkbox"
                name="terms_and_conditions"
                value={input.terms_and_conditions}
                onChange={(e) => handlerCheckbox(e)}
                checked={input.terms_and_conditions}
              />
            </FormControl>
          </Box>
          <Button
            onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
            loadingText="post survey"
            fontFamily={"body"}
            size="lg"
            bg={"orange.300"}
            color={"black"}
            _hover={{
              bg: "orange.400",
            }}
            isDisabled={!isCompleteForm()}
          >
            Enviar encuesta
          </Button>

          <Button
            fontFamily={"body"}
            bg="base.green.100"
            fontSize={"1.4rem"}
            color={"grey"}
            _hover={{
              color: "orange.400",
            }}
            p="0"
            mr="1rem"
            onClick={() => navigate("/")}
          >
            Ver respuestas
          </Button>
        </Stack>
      </Flex>
    </form>
  );
}
