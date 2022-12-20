export function configChatData(data, secretData) {
  return {
    id: data._id,
    title: data.title,
    users: data.users,
    ...secretData,
  };
}
