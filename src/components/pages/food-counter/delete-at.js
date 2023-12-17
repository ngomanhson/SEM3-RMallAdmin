import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";

function FoodCounterDeleteAt() {
    return (
        <Layout>
            <Breadcrumb title="Food Counter Delete At" />
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-responsive-md">
                        <thead>
                            <tr>
                                <th>
                                    <strong>No.</strong>
                                </th>
                                <th>
                                    <strong>Thumbnail</strong>
                                </th>
                                <th>
                                    <strong>Food Counter Name</strong>
                                </th>
                                <th>
                                    <strong>Description</strong>
                                </th>
                                <th>
                                    <strong></strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>1</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" className="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>Adidas</td>
                                <td>The movie is very good</td>
                                <td>
                                    <div className="d-flex">
                                        <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" className="btn btn-primary shadow btn-xs sharp me-1">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" className="btn btn-danger shadow btn-xs sharp">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>2</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" className="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>Nike</td>
                                <td>The movie is very good</td>
                                <td>
                                    <div className="d-flex">
                                        <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" className="btn btn-primary shadow btn-xs sharp me-1">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" className="btn btn-danger shadow btn-xs sharp">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>3</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" className="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>Louis Vuitton</td>
                                <td>The movie is very good</td>
                                <td>
                                    <div className="d-flex">
                                        <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" className="btn btn-primary shadow btn-xs sharp me-1">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" className="btn btn-danger shadow btn-xs sharp">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>4</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" className="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>T2207A</td>
                                <td>The movie is very good</td>
                                <td>
                                    <div className="d-flex">
                                        <a href="#!" className="btn btn-success shadow btn-xs sharp me-1">
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" className="btn btn-primary shadow btn-xs sharp me-1">
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" className="btn btn-danger shadow btn-xs sharp">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default FoodCounterDeleteAt;
