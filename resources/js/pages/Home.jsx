import React from "react";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const {user} = useAuth()
    return <div>{user ? <Category user={user}/> : <Banner />}</div>;
};

export default Home;
