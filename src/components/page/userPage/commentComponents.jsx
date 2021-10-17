import React from "react";
import PropTypes from "prop-types";
const CommentComponents = ({ comments, users, commentRemove }) => {
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
            return ` ${Math.ceil((nowDateSecond - Number(dat)) / 60000)} минуты назад`;
        } else {
            return ` ${new Date(Number(dat)).getDate()} ${
                arrMonth[new Date(Number(dat)).getMonth()]
            }`;
        }
        // console.log(arrMonth[(new Date(Number(dat))).getMonth()]);
        // return 123;
    };
    if (comments && users) {
        return comments.map((item) => (
            <div className="bg-light card-body  mb-3" key={item._id}>
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {
                                                users.find((user) => {
                                                    return (
                                                        user._id === item.userId
                                                    );
                                                }).name
                                            }
                                            <span className="small">
                                                {createDate(item.created_at)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() =>
                                                commentRemove(item._id)
                                            }
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{item.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    } else {
        return <h5>Loading</h5>;
    }
};
CommentComponents.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array,
    commentRemove: PropTypes.func
};
export default CommentComponents;
