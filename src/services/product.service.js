import axios from "axios";
import Config from "../config/index";

export const getAllProductByType = async (type) => {
  try {
    const url = `${Config.baseUrl}/product/by-type?type=${type}`;
    const result = await axios.get(url);
    return result;
  } catch (err) {
    throw err;
  }
};


export const getAllProductByTypePaginate = async (type, page_number,page_size,start_with) => {
  try {
    const url = `${Config.baseUrl}/product/by-type-paginate?type=${type}&page_number=${page_number}&page_size=${page_size}&start_with=${start_with}`;
    const result = await axios.get(url);
    return result;
  } catch (err) {
    throw err;
  }
};
