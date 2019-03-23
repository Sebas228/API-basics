import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  try {
    let salts = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salts);

    return hash;
  } catch (e) {
    console.log(e);
  }
};
