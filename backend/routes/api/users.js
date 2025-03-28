const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/',
    async (req, res) => {
        const { email, password, username, firstName, lastName, userRoleId } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, username, hashedPassword, firstName, lastName, userRoleId });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            userRoleId: user.userRoleId
        };

        await setTokenCookie(res, safeUser);

        return res.json(safeUser);
    }
);

module.exports = router;