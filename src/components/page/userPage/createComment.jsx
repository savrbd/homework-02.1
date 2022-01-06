// import SelectField2 from "../../common/form/selectField2";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import React, { useState, useEffect } from "react";
import TextAria from "../../common/form/textAria";

const CreateComment = ({ onSubmitComment, onChange, data }) => {
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        password: {
            isRequired: {
                message: "Обязательно выберите вашу профессию "
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, []);
    const isValid = Object.keys(errors).length === 0;
    return (
        <>
            <h1>New Comment</h1>
            {/* <SelectField2
                label=""
                defaultOption="Выберите пользователя"
                options={users}
                onChange={onChange}
                value={data.userId}
                error={errors.name}
            /> */}
            <TextAria
                label="Сообщение"
                name="content"
                value={data.content || ""}
                onChange={onChange}
                error={errors.email}
            />
            <div className="d-flex justify-content-end">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                    onClick={() => {
                        onSubmitComment(data);
                    }}
                >
                    Опубликовать
                </button>
            </div>
        </>
    );
};
CreateComment.propTypes = {
    // users: PropTypes.array,
    data: PropTypes.object,
    onSubmitComment: PropTypes.func,
    onChange: PropTypes.func
};

export default CreateComment;
