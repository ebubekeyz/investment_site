const createTokenUser = (user) => {
    return {phone: user.phone, referID: user.referID, userId: user._id, role: user.role}
}

module.exports = createTokenUser