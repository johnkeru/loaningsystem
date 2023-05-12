import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!cookies.token) {
            removeCookie("token");
            removeCookie("user");
        }
        setToken(cookies.token);
        setUser(cookies.user);
    }, [cookies.token, cookies.user]);

    const storeData = ({ data }) => {
        const expirationDate = new Date(data?.expiration);
        setCookie("token", data.token, { path: "/", expires: expirationDate });
        setCookie("user", data.user, { path: "/", expires: expirationDate });
    };

    const modifyUser = (user) => {
        setCookie("user", user);
    };

    const destroy = (close) => {
        axios
            .post(
                "/api/logout",
                {},
                { headers: { Authorization: "Bearer " + token } }
            )
            .then(() => {
                removeCookie("token");
                removeCookie("user");
                close();
                // nav('/login')
            })
            .catch(() => alert("Something went wrong!"));
    };

    return { token, user, destroy, storeData, modifyUser };
};

export default useAuth;
