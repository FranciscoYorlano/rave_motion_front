// Redux
import { connect } from "react-redux";
import { setCurrentPageF } from "../redux/actions/eventsActions";

// Assets
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PaginadoF = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.name));
    };

    return (
        <div className="flex content-center w-full h-16">
            <div className="flex self-center items-center gap-6 my-4 mx-auto">
                <button
                    name={currentPage - 1}
                    onClick={handlePageChange}
                    disabled={currentPage === 1}
                    className="btnPagination"
                >
                    Previous
                </button>
                {currentPage === totalPages && totalPages > 3 && (
                    <button
                        name={currentPage - 2}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage - 2}
                    </button>
                )}
                {currentPage >= 2 && (
                    <button
                        name={currentPage - 1}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage - 1}
                    </button>
                )}
                <button
                    name={currentPage}
                    onClick={handlePageChange}
                    className="btnPaginationSelected"
                >
                    {currentPage}
                </button>

                {currentPage < totalPages && (
                    <button
                        name={currentPage + 1}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage + 1}
                    </button>
                )}
                {currentPage === 1 && totalPages > 3 && (
                    <button
                        name={currentPage + 2}
                        onClick={handlePageChange}
                        className="btnPagination"
                    >
                        {currentPage + 2}
                    </button>
                )}
                <button
                    name={currentPage + 1}
                    onClick={handlePageChange}
                    disabled={currentPage === totalPages}
                    className="btnPagination"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPageF,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (page) => dispatch(setCurrentPageF(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginadoF);