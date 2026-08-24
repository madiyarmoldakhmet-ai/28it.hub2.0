const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { get, run } = require('../db/database');

function signToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function register(req, res) {
  try {
    const username = String(req.body.username || '').trim();
    const password = String(req.body.password || '').trim();

    if (!username || !password) {
      return res.status(400).json({ message: 'Введите имя пользователя и пароль' });
    }

    if (username.length < 1 || password.length < 1) {
      return res.status(400).json({
        message: 'Имя пользователя и пароль не могут быть пустыми',
      });
    }

    const existingUser = await get('SELECT id FROM users WHERE username = ?', [username.toLowerCase()]);
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с таким именем уже зарегистрирован' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username.toLowerCase(), passwordHash]);

    const user = { id: result.id, username: username.toLowerCase() };
    const token = signToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
}

async function login(req, res) {
  try {
    const username = String(req.body.username || '').trim().toLowerCase();
    const password = String(req.body.password || '').trim();

    if (!username || !password) {
      return res.status(400).json({ message: 'Введите имя пользователя и пароль' });
    }

    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }

    const token = signToken({ id: user.id, username: user.username });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка входа', error: error.message });
  }
}

module.exports = {
  register,
  login,
};
