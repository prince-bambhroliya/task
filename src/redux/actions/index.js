import axios from "axios"
export const fetchData = async (dispatch) => {
  try {
    const details = await axios.get(
      "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
    );
    return details.data.result.auditLog;
  
  } catch (err) {
    console.log(err);
  }
};

