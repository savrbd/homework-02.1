import React from "react";
import PropTypes from "prop-types";

const TextAria = ({ label, name, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    rows ="3"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
        </div>
    );
};

TextAria.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default TextAria;
