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
        DETAIL: "/genre/get-by-id/{}",
        CREATE: "/genre/create",
        UPDATE: "/genre/edit",
        TRASH: "/genre/trash-can",
        DELETE: "/genre/delete",
        RESTORE: "/genre/restore/{}",
    },
    FOOD: {
        LIST: "/food/get-all",
        DETAIL: "/food/get-by-id/{}",
        CREATE: "/food/create",
        UPDATE: "/food/edit",
        TRASH: "/food/trash-can",
        DELETE: "/food/delete/{}",
        RESTORE: "/food/restore/{}",
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
