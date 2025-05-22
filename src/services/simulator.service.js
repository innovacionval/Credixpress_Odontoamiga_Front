import { axiosInstanceBearer } from "./instances"

export const getFinantialData = () => {
  return axiosInstanceBearer.get("finantial_table")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error("Error fetching financial data:", error)
      throw error
    })
}