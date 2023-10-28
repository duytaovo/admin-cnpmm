import axios, { AxiosError } from "axios";
import config from "src/constants/configApi";
import HttpStatusCode from "src/constants/httpStatusCode.enum";
import { ErrorResponse } from "src/types/utils.type";

export const payloadCreator =
  (asyncFunc: any) => async (arg: any, thunkAPI: any) => {
    try {
      const res = await asyncFunc(arg);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  };

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
      error
    ) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (name: string) => {
  const arr = name?.split("-i-");
  return arr[arr?.length - 1];
};
export const getAvatarUrl = (avatarName?: string) =>
  avatarName ? `${config.baseUrl}images/${avatarName}` : "";

//////////// routes
// export const showPlayerInfo = (value: boolean) => {
//   const dispatch = useAppDispatch()
//   document.body.style.overflowY = value ? "hidden" : "scroll"

//   dispatch(togglePlayerInfo(value))
// }

// export const showPlayer = (value: boolean) => {
//   const dispatch = useAppDispatch()

//   dispatch(togglePlayer(value))
// }
// interface IPlaySongProps {
//   id: string
//   idPlayList?: string
// }
// export const playSong = ({ id = "" }: IPlaySongProps) => {
//   const { isLoading,idPlayList } = useAppSelector((state) => state.audio)

//   showPlayer(true)
//   showPlayerInfo(true)
//   // setSong({ id, idPlayList })
// }
