import { Link } from "react-router-dom";
import Layout from "../../layouts/index";
function MovieDeleteAt() {
    return (
        <Layout>
            <div className="row page-titles">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#!">Movie Delete At</a>
                    </li>
                </ol>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-responsive-md">
                        <thead>
                            <tr>
                                <th>
                                    <strong>No.</strong>
                                </th>
                                <th>
                                    <strong>Thumbnail</strong>
                                </th>
                                <th>
                                    <strong>Movie Code</strong>
                                </th>
                                <th>
                                    <strong>Movie Name</strong>
                                </th>
                                <th>
                                    <strong>Description</strong>
                                </th>
                                <th>
                                    <strong>Room</strong>
                                </th>
                                <th>
                                    <strong>Ticket</strong>
                                </th>
                                <th>
                                    <strong>Start Date</strong>
                                </th>
                                <th>
                                    <strong>End Date</strong>
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
                                    <img src="assets/images/avatar/1.jpg" class="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>T2207A</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <span class="w-space-no">Dr. Jackson</span>
                                    </div>
                                </td>
                                <td>The movie is very good</td>
                                <td>B12</td>
                                <td>23/10</td>
                                <td>01 August 2020</td>
                                <td>01 August 2020</td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#!" class="btn btn-success shadow btn-xs sharp me-1">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" class="btn btn-primary shadow btn-xs sharp me-1">
                                            <i class="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" class="btn btn-danger shadow btn-xs sharp">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>2</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" class="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>T2207A</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <span class="w-space-no">Dr. Jackson</span>
                                    </div>
                                </td>
                                <td>The movie is very good</td>
                                <td>B12</td>
                                <td>30/09</td>
                                <td>01 August 2020</td>
                                <td>01 August 2020</td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#!" class="btn btn-success shadow btn-xs sharp me-1">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" class="btn btn-primary shadow btn-xs sharp me-1">
                                            <i class="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" class="btn btn-danger shadow btn-xs sharp">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>3</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" class="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>T2207A</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <span class="w-space-no">Dr. Jackson</span>
                                    </div>
                                </td>
                                <td>The movie is very good</td>
                                <td>B12</td>
                                <td>27/01</td>
                                <td>01 August 2020</td>
                                <td>01 August 2020</td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#!" class="btn btn-success shadow btn-xs sharp me-1">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" class="btn btn-primary shadow btn-xs sharp me-1">
                                            <i class="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" class="btn btn-danger shadow btn-xs sharp">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>4</strong>
                                </td>
                                <td>
                                    <img src="assets/images/avatar/1.jpg" class="rounded-lg me-2 movie-thumb" alt="" />
                                </td>
                                <td>T2207A</td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <span class="w-space-no">Dr. Jackson</span>
                                    </div>
                                </td>
                                <td>The movie is very good</td>
                                <td>B12</td>
                                <td>17/04</td>
                                <td>01 August 2020</td>
                                <td>01 August 2020</td>
                                <td>
                                    <div class="d-flex">
                                        <a href="#!" class="btn btn-success shadow btn-xs sharp me-1">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                        <a href="#!" class="btn btn-primary shadow btn-xs sharp me-1">
                                            <i class="fas fa-pencil-alt"></i>
                                        </a>
                                        <a href="#!" class="btn btn-danger shadow btn-xs sharp">
                                            <i class="fa fa-trash"></i>
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

export default MovieDeleteAt;
