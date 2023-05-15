import React, { useEffect } from "react";

// React Router Dom
import { Routes, Route, useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { verifyToken } from "./redux/actions/usersActions";

// Universal Cookies
import Cookies from "universal-cookie";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// App views
import About from "./views/app-views/About";
import Home from "./views/app-views/Home";
import SearchResults from "./views/app-views/SearchResults";
import NotFound from "./views/app-views/NotFound";

// Events views
import EventCart from "./views/events-views/EventCart";
import EventCreate from "./views/events-views/EventCreate";
import EventTicketsCreate from "./views/events-views/EventTicketsCreate";
import EventDetail from "./views/events-views/EventDetail";

// User views
import PasswordChange from "./views/users-views/PasswordChange";
import ProducerDashboard from "./views/users-views/ProducerDashboard";
import ProducerEventDetail from "./views/users-views/ProducerEventDetail";
import SignIn from "./views/users-views/SignIn";
import SignUp from "./views/users-views/SignUp";
import UserTickets from "./views/users-views/UserTickets";

const App = ({ verifyToken, isLogin, userData }) => {
    // Locations
    const location = useLocation().pathname;

    const showHeader = location !== "/signin" && location !== "/signup";

    // Protección de rutas
    function authRequired() {
        return isLogin;
    }
    function accessRequired() {
        return userData.accessType !== "producer";
    }

    // Sign In by JSW
    useEffect(() => {
        if (!isLogin) {
            const cookies = new Cookies();
            const token = cookies.get("jwt");
            console.log("app");
            console.log(token);
            verifyToken(token);
        }
    }, []);

    return (
        <div className="bg-primary text-white antialiased">
            {showHeader && <Header />}
            <Routes>
                {/* App views */}
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Events views */}

                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/create" element={<EventCreate />} />
                <Route
                    path="/create/tickets/:eventId/"
                    element={<EventTicketsCreate />}
                />

                <Route path="/cart" element={<EventCart />} />

                {/* User views */}

                <Route path="/changepassword" element={<PasswordChange />} />
                <Route path="/dashboard" element={<ProducerDashboard />} />
                <Route
                    path="/dashboard/:eventId"
                    element={<ProducerEventDetail />}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tickets" element={<UserTickets />} />

                {/* Not found Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyToken: () => dispatch(verifyToken()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
