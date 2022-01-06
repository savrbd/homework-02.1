import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField2 = ({
    options,
    onChange,
    name,
    label,
    defaultQuaties
}) => {
    let defaultQuaties2 = [];
    if (defaultQuaties[0]) {
        defaultQuaties2 = defaultQuaties.map((q) => ({
            label: q.name,
            value: q._id
        }));
    }
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    if (defaultQuaties2[0]) {
        return (
            <div className="mb-4">
                <label className="form-label">{label}</label>
                <Select
                    defaultValue={defaultQuaties2}
                    isMulti
                    closeMenuOnSelect={false}
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                />
            </div>
        );
    } else {
        return <div>Load</div>;
    }
};
MultiSelectField2.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultQuaties: PropTypes.array,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MultiSelectField2;
