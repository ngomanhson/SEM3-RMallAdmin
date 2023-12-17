import { Link } from "react-router-dom";

function Breadcrumb({ title }) {
    return (
        <div className="row page-titles">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                    <a href="#!">{title}</a>
                </li>
            </ol>
        </div>
    );
}

export default Breadcrumb;
