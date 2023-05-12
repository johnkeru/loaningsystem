import React, { useEffect } from "react";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import auth from "../global/urls/auth";

const Home = () => {
    const { user, token, modifyUser } = useAuth();
    useEffect(() => {
        if (token) {
            axios
                .get(auth.USER, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => modifyUser(res.data));
        }
    }, [token]);
    return (
        <div>
            {user ? (
                <Category user={user} token={token} modifyUser={modifyUser} />
            ) : (
                <Banner />
            )}
        </div>
    );
};

export default Home;
