const url = {
    BASE_URL: "https://localhost:7220/api",
    MOVIE: {
        LIST: "/movie",
        DETAIL: "/movie/{}",
        CREATE: "/movie/create",
        UPDATE: "/movie/edit",
        TRASH: "/movie/trash-can",
        DELETE: "/movie/delete",
        RESTORE: "/movie/restore/{}",
    },
    SHOW: {
        LIST: "/show",
        CREATE: "/show",
        GETBYROOM: "/show/get-by-room/{}",
    },
    PROMOTION: {
        LIST: "/promotion/get-all",
        DETAIL: "/promotion/get-by-id/{}",
        CREATE: "/promotion/create",
        UPDATE: "/promotion/edit",
        TRASH: "/promotion/trash-can",
        DELETE: "/promotion/delete",
        RESTORE: "/promotion/restore/{}",
    },
    GENRE: {
        LIST: "/genre",
    },
    ROOM: {
        LIST: "/room/get-all",
    },
    LANGUAGE: {
        LIST: "/language/get-all",
    },

    AUTH: {
        LOGIN: "/auth/login",
        FORGOT_PASSWORD: "/auth/forgot-password",
        PROFILE: "/auth/profile",
        UPDATE_PROFILE: "/auth/update-profile",
    },
};
export default url;
