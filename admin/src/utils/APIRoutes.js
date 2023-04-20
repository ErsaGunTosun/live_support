export const host = "http://localhost:5000";

export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;

export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
//Box
export const messageBox = `${host}/api/messages/box`;
export const sendMessageBoxRoute = `${host}/api/messages/box/addmsg`;
export const recieveMessageBoxRoute = `${host}/api/messages/box/getmsg`;
export const acceptBoxRoute = `${host}/api/messages/box/accept`;
//Admin
export const loginRoute = `${host}/api/admin/auth/login`;
export const allUsersRoute = `${host}/api/admin/auth/allusers`;
export const userRoute = `${host}/api/admin/auth/user`;
export const checkUserRoute = `${host}/api/admin/auth/checkuser`;
