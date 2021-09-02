// O regex eu peguei do meu projeto App de receitas;

// const validaEmail = (email, validateEmail, res) => {
//     if (!email || email === '') {
//         return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//     }

//     if (!validateEmail
//         ) {
//         return res
//             .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
//     }
// };

const validaSenha = (password, res) => {
    if (!password || password === '') {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

const authLoginAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    const validateEmail = email.match(/[a-z]+@[a-z]+.com/g);
    const response = res;

    // validaEmail(email, validateEmail, response);
    if (!email || email === '') {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!validateEmail
        ) {
        return res
            .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    validaSenha(password, response);

    next();
};

module.exports = authLoginAndPassword;
