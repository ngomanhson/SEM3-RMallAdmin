const url = {
    BASE_URL: "https://localhost:7220/api",
    MENU: {
        LIST: "/menu",
    },
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
    SHOP: {
        LIST: "/shop/get-all",
        DETAIL: "/shop/detail/{}",
        CREATE: "/shop/create",
        UPDATE: "/shop/edit",
        TRASH: "/shop/trash-can",
        DELETE: "/shop/delete",
        RESTORE: "/shop/restore/{}",
    },
    PRODUCT: {
        LIST: "/product/get-all",
        LISTBYSHOP: "/product/get-by-shop/{}",
        DETAIL: "/product/detail/{}",
        CREATE: "/product/create",
        UPDATE: "/product/edit",
        TRASH: "/product/trash-can",
        DELETE: "/product/delete",
        RESTORE: "/product/restore/{}",
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
        GETBYFLOOR: "/shop/get-all-by-floor/{}",
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
    CATEGORY: {
        LIST: "/category/get-all",
    },
    FLOOR: {
        LIST: "/floor/get-all",
    },
    AUTH: {
        LOGIN: "/auth/login",
        FORGOT_PASSWORD: "/auth/forgot-password",
        PROFILE: "/auth/profile",
        UPDATE_PROFILE: "/auth/update-profile",
        CHANGE_PASSWORD: "/auth/change-password",
        RESET_PASSWORD: "auth/reset-password",
    },
};
export default url;
