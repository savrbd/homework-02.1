import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentComponents = ({ comments, commentRemove }) => {
    return comments.map((item) => (
        <Comment key= {item._id} comment={item} commentRemove={commentRemove} />
    ));
};
CommentComponents.propTypes = {
    comments: PropTypes.array,
    commentRemove: PropTypes.func
};
export default CommentComponents;
