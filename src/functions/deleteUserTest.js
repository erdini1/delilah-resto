const { deleteUserByEmail } = require("../repositories/users");

async function deleteUser (email) {
    return await deleteUserByEmail(email)
}

module.exports = {deleteUser}