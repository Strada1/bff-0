export function configMessageData(data) {
  return {
    id: data.id,
    user: {
      id: data.user._id,
      nickname: data.user.nickname,
      username: data.user.username,
    },
    chat: data.chat._id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}
