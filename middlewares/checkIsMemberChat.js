const {ObjectId} = require("mongodb");
const checkIsMemberChat = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await getByTokenUserService(token);
        const { chatId } = req.params;
        const chat = await getByIdChatService(chatId);

        const isMemberChat = chat.users.includes(ObjectId(user._id));
        if (!isMemberChat) {
            return res.status(403).send('Forbidden');
        }
        next();
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

module.exports = checkIsMemberChat;