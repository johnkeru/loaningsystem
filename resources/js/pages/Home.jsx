import React from "react";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import { useSelector } from "react-redux";

const Home = () => {
    const isLogged = useSelector((root) => root.current_user.isLogged);

    return <div>{isLogged ? <Category /> : <Banner />}</div>;
};

export default Home;
