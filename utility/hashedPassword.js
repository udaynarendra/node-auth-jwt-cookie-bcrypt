import bcrypt from 'bcrypt';

const hashedPassword = async (password) => {

    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password, HashPassword) => {
    return await bcrypt.compare(password, HashPassword);
}

export { comparePassword, hashedPassword };