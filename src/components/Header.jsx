// Hooks
import { useState, useEffect, useRef } from "react";

// React Router Dom
import { Link, useNavigate, useLocation } from "react-router-dom";





// Redux
import { connect } from "react-redux";
import { getEventsByName } from "../redux/actions/eventsActions";
import { signOut } from "../redux/actions/usersActions";

// Assets
import rave from "../assets/logo3.png";
import SearchResults from "../views/app-views/SearchResults";

const Header = (props) => {
  const { isLogin, userData, signOut } = props;
  const { getEventsByName } = props;

  // Fondo opaco
  const [opacity, setOpacity] = useState(0);
  const handleScroll = () => {
    if (window.pageYOffset > window.innerHeight * 0.4) {
      setOpacity(0.7);
    } else {
      setOpacity(window.pageYOffset / (window.innerHeight * 0.4) / 1.42);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: `rgba(2, 6, 23, ${opacity})`,
  };

  // Dropdown
  const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    let hideTimeout; 
    
    const handleOptionClick = () => {
      setShowDropdown(false);
    };
    
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("navLinkDropdown")
      ) {
        setShowDropdown(false);
      }
    };
    
    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
    
    const handleMouseEnter = () => {
      clearTimeout(hideTimeout); 
      setShowDropdown(true);
    };
    
    const handleMouseLeave = () => {
      hideTimeout = setTimeout(() => {
        setShowDropdown(false);
      }, 100); 
    };

  // Search
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda

  const handleInputChange = (event) => {
    const searchValue = event.target.value;
    setName(searchValue);

    if (searchValue.trim() !== "") {
      getEventsByName(searchValue.trim())
        .then((response) => {
          setSearchResults(response); 
        })
        .catch((error) => {
        });
    } else {
      setSearchResults([]); 
    }
  };

  const navigate = useNavigate();
  const handleSearchsubmit = (event) => {
    event.preventDefault();
    navigate("/search");
    getEventsByName(name.trim());
    setName("");
    
  };

  // Sign Out
  const handleSignOut = () => {
    isLogin && signOut();
    navigate("/");
  };

    return (
        <div
            className="grid grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium"
            style={headerStyle}
        >
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">
                    <img className="w-48" src={rave} alt="Rave Motion Logo" />
                </Link>
            </div>
            <div className="flex justify-self-center items-center">
   
            <form onSubmit={handleSearchsubmit}>
          <input
            className="w-96 input"
            type="text"
            placeholder="Buscar evento"
            onChange={handleInputChange}
            onSubmit={handleSearchsubmit}
            value={name}
          />
          {searchResults && searchResults.length > 0 && ( // Mostrar los resultados de búsqueda si existen
            <ul>
              {searchResults.map((allEvents) => (
                <li key={allEvents.id}>{allEvents.name}</li>
              ))}
            </ul>
          )}
        </form>
            </div>
            <div className="flex w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
                {/* <Link to="/" className="navLink">
                    Home
                </Link> */}
                <Link to="/" className="navLink">
                    Home
                </Link>

                <Link to="/about" className="navLink">
                    Nosotros
                </Link>
                {isLogin ? (
                    <>
                          {/* Dropdown user  */}
                          <div className="inline-block relative" ref={dropdownRef}>
                            <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="btnPrimary py-0 px-4 w-fit border-none"
                            >
                            Tu cuenta
                             </button>
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`"z-20 bg-secondary rounded-md w-40 left-[-2rem] top-[2rem] text-center" ${
                            showDropdown ? "block" : "hidden"
                            }`}
                            style={{ position: "absolute" }}
                        >
                        <div className="dropDownItem border-b-2 border-secondaryBorder">
                            <Link className="navLinkDropdown" 
                                to="/tickets" 
                                onClick={handleOptionClick}>
                                Mis tickets
                                    </Link>
                                </div>
                                {userData.accessType === "producer" && (
                                    <>
                                        <div className="dropDownItem">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/create"
                                            >
                                                Crear evento
                                            </Link>
                                        </div>
                                        <div className="dropDownItem border-b-2 border-secondaryBorder">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    </>
                                )}

                                <div className="dropDownItem">
                                    <div
                                        onClick={handleSignOut}
                                        className="navLinkDropdown"
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="navLink ">
                            Iniciar Sesión
                        </Link>
                        <Link to="/signup" className="navLink">
                            Registrarse
                        </Link>
                    </>
                )}
            </div>
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
        signOut: () => dispatch(signOut()),
        getEventsByName: (name) => dispatch(getEventsByName(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
