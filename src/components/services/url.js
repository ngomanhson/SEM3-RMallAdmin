const url = {
    BASE_URL: "https://localhost:7220/api",
    MOVIE: {
        LIST: "/movie",
        DETAIL: "/movie/{}",
        CREATE: "/movie/create",
        UPDATE: "/movie/edit",
        DELETE: "/movie/delete",
    },
    SHOW: {
        LIST: "/show",
        CREATE: "/show",
    },
    GENRE: {
        LIST: "/genre",
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
