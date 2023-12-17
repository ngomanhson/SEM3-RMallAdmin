import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";

function MovieEdit() {
    return (
        <Layout>
            <Breadcrumb title="Movie Edit" />
            <div className="row">
                <div className="col-xl-12 col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Movie Edit</h4>
                        </div>
                        <div className="card-body">
                            <form action="#!">
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Movie Name <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="movie-name" className="form-control" placeholder="Four Idiots" autoFocus required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Ticket number <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="ticket-number" className="form-control" placeholder="100" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Room <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" name="Room" className="form-control" placeholder="B12" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Start Date <span className="text-danger">*</span>
                                            </label>
                                            <input type="date" name="email" className="form-control" placeholder="example@gmail.com" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                End Date <span className="text-danger">*</span>
                                            </label>
                                            <input type="date" name="email" className="form-control" placeholder="example@gmail.com" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Thumbnail <span className="text-danger">*</span>
                                            </label>
                                            <input type="file" name="thumbnail" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-2">
                                        <div className="mb-3">
                                            <label className="text-label form-label">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <button type="submit" className="btn btn-default">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MovieEdit;
