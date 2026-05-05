import { loginService } from '../services/auth.service.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: "Fields 'email' and 'password' are required.",
    });
  }

  const result = await loginService(email, password);

  if (!result) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid credentials.',
    });
  }

  return res.status(200).json(result);
};