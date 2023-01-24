import argo2 from "argon2";
import logger from "./logger";

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    return await argo2.hash(password);
  } catch (error) {
    logger.error("Could not hash password");
    return null;
  }
};

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await argo2.verify(hash, password);
  } catch (error) {
    logger.error("Could not validate password");
    return false;
  }
};
