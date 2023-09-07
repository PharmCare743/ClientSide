import axios from "axios";
import Config from "../config/index";

export const addPrescription = async (
  contact_email,
  contact_phone,
  contact_name,
  image,
  file_name
) => {
  try {
    const url = `${Config.baseUrl}/prescription`;
    const result = await axios.post(url, {
        contact_email,
        contact_phone,
        contact_name,
        image,
        file_name
    });
    return result;
  } catch (err) {
    throw err;
  }
};
