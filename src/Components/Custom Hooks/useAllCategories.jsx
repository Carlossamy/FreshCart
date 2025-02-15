import axios from "axios";
import { useQuery } from "react-query";

export default function useAllCategories() {
  function getCatategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const allObjects = useQuery({
    queryKey: ["allCategories"],
    queryFn: getCatategories
  });

  return allObjects;
}
