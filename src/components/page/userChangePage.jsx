import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelectField from "../common/form/myltiSelectField";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import api from "../../api";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";

const UserChangePage = ({ match }) => {
    const history = useHistory();
    const userId = match.params.userId;
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState();
    const [professions, setProffesion] = useState([]);
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProffesion(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    if (user && qualities && professions) {
        const defaultQuaties = user.qualities.map((item) => ({
            label: item.name,
            value: item._id
        }));
        const handleSubmit = (e) => {
            e.preventDefault();
            const data2Profession = Object.values(professions).find((item) => {
                return item._id === data.profession;
            });
            const data2QualitiesArray = data.qualities;
            const data2Qualities = data2QualitiesArray.map((item) =>
                Object.values(qualities).find((item1) => {
                    return item1._id === item.value;
                })
            );
            const data2 = {
                email: `${data.email}`,
                password: "",
                profession:
                    data.profession === "" ? user.profession : data2Profession,
                sex: "male",
                qualities:
                    data.qualities.length === 0
                        ? user.qualities
                        : data2Qualities
            };
            api.users.update(userId, data2);
            history.push(`/users/${userId}`);
        };
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption={user.profession.name}
                                options={professions}
                                onChange={handleChange}
                                value={data.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                name="sex"
                                onChange={handleChange}
                                value={data.sex}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultQuaties={defaultQuaties}
                            />
                            {/* <Link to={`/users/${userId}`}> */}
                            <button
                                type="submit"
                                // disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                            {/* </Link> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h5>Loading ...</h5>;
    }
};
UserChangePage.propTypes = {
    match: PropTypes.object.isRequired
};

export default UserChangePage;
