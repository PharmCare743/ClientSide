import axios from "axios";
import Config from "../config/index";

export const addOrder = async (
  contact_email,
  contact_phone,
  contact_address,
  contact_name,
  order_detail,
  total_price
) => {
  try {
    const url = `${Config.baseUrl}/order`;
    const result = await axios.post(url, {
      contact_email,
      contact_phone,
      contact_address,
      contact_name,
      order_detail,
      total_price,
    });
    return result;
  } catch (err) {
    throw err;
  }
};
