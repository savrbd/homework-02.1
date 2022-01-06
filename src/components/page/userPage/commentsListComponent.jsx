import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentComponents from "./commentComponents";
import CreateComment from "./createComment";
// import api from "../../../api";
import _ from "lodash";
import { useComments } from "../../../hooks/useComments";
const CommentsListComponent = ({ userId }) => {
    const { createComment, comments, removeComment } = useComments();
    // useEffect(() => {
    //     setComments(JSON.parse(localStorage.getItem("comments")));
    // }, []);
    // console.log("comments", comments);
    // setComment(comments);
    const [data, setData] = useState({});
    // const [data, setData] = useState({
    //     content: "",
    //     userId: ""
    // });

    const commentRemove = (Id) => {
        removeComment(Id);
        // api.comments.remove(commentId);
        // setComments(
        //     comments.filter((item) => {
        //         return item._id !== commentId;
        //     })
        // );
    };
    const handleSubmitComment = (data) => {
        createComment(data);
        setData({});
        // api.comments
        //     .add(data)
        //     .then((data2) =>
        //         setComments((prevState) => [...prevState, ...[data2]])
        //     );
        // setData({
        //     content: "",
        //     userId: ""
        // });
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <CreateComment
                        // users={users}
                        onSubmitComment={handleSubmitComment}
                        data={data}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {comments
                ? <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentComponents
                            // comments={comments}
                            userId={userId}
                            comments={sortedComments}
                            // users={users}
                            commentRemove={commentRemove}
                        />
                    </div>
                </div>
                : <p>Loading</p>
            }
        </>
    );
};
CommentsListComponent.propTypes = {
    userId: PropTypes.string
};

export default CommentsListComponent;
