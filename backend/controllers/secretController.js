import secrets from '../utils/secrets';

export const getSecret = (req, res) => {
    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];
    res.json({ secret: randomSecret });
};
