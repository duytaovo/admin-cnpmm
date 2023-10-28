import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig = omitBy(
    {
      id: queryParams.id || localStorage.getItem("songId"),
      idPlayList: queryParams.idPlayList || localStorage.getItem("idPlayList"),
    },
    isUndefined
  );
  return queryConfig;
}
