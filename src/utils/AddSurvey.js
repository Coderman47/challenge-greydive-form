import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/Firebase";

export default async function addSurvey({
  full_name,
  birth_date,
  email,
  country_of_origin,
  terms_and_conditions,
}) {
  try {
    const docRef = await addDoc(collection(db, "surveys"), {
      full_name,
      email,
      birth_date,
      country_of_origin,
      terms_and_conditions,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}