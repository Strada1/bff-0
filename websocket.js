const { WebSocketServer } = require('ws');
const {getByTokenUserService} = require("./service/userService");
const {createMessageService} = require("./service/messageService");

const wss = new WebSocketServer({ port: 8080 });

function getToken(req) {
    return req.url.slice(1)
}

function hasChat(client, message) {
    return client.user.chats.includes(message.chatId)
}

function sendMessageInChat(wss, sender, message) {
    if (hasChat(sender, message)) {
        wss.clients.forEach((client) => {
            if (client !== sender) {
                if (hasChat(client, message)) {
                    client.send(JSON.stringify(message))
                }
            }
        });
    }
}

wss.on('connection', async function connection(ws, req) {
    const token = getToken(req);
    let user;
    if (!token) {
        ws.send('Для продолжения укажите токен');
        ws.close();
    }

    try {
        user = await getByTokenUserService(token);
        ws.user = user;
        if (!user) {
            ws.send('Извините, такой пользователь не найден');
            ws.close();
        }
    } catch (e) {
        console.log(e.message);
    }

    console.log(`к чату присоединился ${user.username}`)

    ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        message.userId = user._id;
        console.log(message.text, 'from', user.username);
        try {
            await createMessageService(message);
        } catch (e) {
            console.log(e.message);
            return
        }
        sendMessageInChat(wss, ws, message)
    }
});

module.exports = wss;