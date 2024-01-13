const url = {
    BASE_URL: "https://localhost:7220/api",
    MENU: {
        LIST: "/menu",
    },
    DASHBOARD: {
        TOTAL_SHOP: "/dashboard/total-shop",
        TOTAL_MOVIE: "/dashboard/total-movie",
        TOTAL_SHOW_TODAY: "/dashboard/total-show-today",
        LIST_SHOW_TODAY: "/dashboard/list-show-today",
        TOTAL_ORDER_TODAY: "/dashboard/total-order-today",
        LIST_ORDER_TODAY: "/dashboard/list-order-today",
        TOTAL_CUSANDSTA: "/dashboard/total-cusAndSta",
        TOTAL_SHOW: "/dashboard/shows-nowAndUpcoming",
        TOTAL_REVENUE: "/dashboard/revenue",
        TOPMOVIESELLING: "/dashboard/movie/top-10-selling",
        TOPSHOPTRAFFIC: "/dashboard/shop/top-10-with-traffic",
        ORDEROVERVIEW: "/dashboard/order-overview",
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
        DELETE: "/show/delete",
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
        DETAIL: "/product/get-by-id/{}",
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
        DELETE: "/food/delete",
        RESTORE: "/food/restore/{}",
    },
    ROOM: {
        LIST: "/room/get-all",
    },
    LANGUAGE: {
        LIST: "/language/get-all",
        GETBYMOVIE: "/language/get-by-movie/{}",
    },
    CATEGORY: {
        LIST: "/category/get-all",
    },
    FLOOR: {
        LIST: "/floor/get-all",
    },
    FEEDBACK: {
        LIST: "/feedback/get-all",
    },
    AUTH: {
        LOGIN: "/auth/login",
        FORGOT_PASSWORD: "/auth/forgot-password",
        PROFILE: "/auth/profile",
        UPDATE_PROFILE: "/auth/update-profile",
        CHANGE_PASSWORD: "/auth/change-password",
        RESET_PASSWORD: "auth/reset-password",
    },
    BOOKING: {
        LIST: "/order",
        DETAIL: "order/get-by-id",
        USE_TICKET: "/order/use-tickets",
    },
};
export default url;
