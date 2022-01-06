import React from "react";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
const Comment = ({ comment, commentRemove }) => {
    const { getUserById } = useUser();
    const user = getUserById(comment.userId);
    const { currentUser } = useAuth();
    const createDate = (dat) => {
        const arrMonth = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const nowDateSecond = new Date().getTime();
        if (nowDateSecond - Number(dat) < 3600000) {
            return ` ${Math.ceil(
                (nowDateSecond - Number(dat)) / 60000
            )} минут назад`;
        } else {
            return ` ${new Date(Number(dat)).getDate()} ${
                arrMonth[new Date(Number(dat)).getMonth()]
            }`;
        }
    };
    if (user) {
        return (
            <div className="bg-light card-body  mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={user.image}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                {createDate(comment.created_at)}
                                            </span>
                                        </p>
                                        {currentUser._id === user.Id && (
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    commentRemove(comment._id)
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        )}
                                        {/* <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    commentRemove(item._id)
                                                }
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button> */}
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div>Loading000</div>;
    }
};
Comment.propTypes = {
    comment: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    commentRemove: PropTypes.func
};

export default Comment;
