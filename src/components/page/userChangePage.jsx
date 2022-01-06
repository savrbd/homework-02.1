import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelectField2 from "../common/form/myltiSelectField2";
import RadioField from "../common/form/radioField";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
// import api from "../../api";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";

const UserChangePage = ({ match }) => {
    const history = useHistory();
    const userId = match.params.userId;
    const [errors, setErrors] = useState({});
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    // const [user, setUser] = useState();
    // const [professions, setProffesion] = useState([]);
    // const [qualities, setQualities] = useState({});
    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setUser(data));
    // }, []);
    const { updateUser } = useAuth();
    const [data, setData] = useState({
        name: `${user.name}`,
        email: `${user.email}`,
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setUser(data));
    // }, []);
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProffesion(data));
    //     api.qualities.fetchAll().then((data) => setQualities(data));
    // }, []);

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
        const defaultProfession = professions.find((p) => {
            return p._id === user.profession;
        });
        const professionsList = professions.map((p) => ({
            label: p.name,
            value: p._id
        }));
        const qualitiesList = qualities.map((q) => ({
            label: q.name,
            value: q._id
        }));
        const defaultQualities = user.qualities.map((item) => {
            return (item = qualities.find((q) => {
                return q._id === item;
            }));
        });
        const handleSubmit = async (e) => {
            e.preventDefault();
            const data2Profession = Object.values(professions).find((item) => {
                return item._id === data.profession;
            });
            const data3Profession = data2Profession._id;
            const data2QualitiesArray = data.qualities;
            const data2Qualities = data2QualitiesArray.map((item) =>
                Object.values(qualities).find((item1) => {
                    return item1._id === item.value;
                })
            );
            const data3Qualities = data2Qualities.map((item) => {
                return item._id;
            });
            const data2 = {
                ...user,
                name: `${data.name}`,
                email: `${data.email}`,
                password: "",
                profession:
                    data.profession === "" ? user.profession : data3Profession,
                sex: "male",
                qualities:
                    data.qualities.length === 0
                        ? user.qualities
                        : data3Qualities
            };
            console.log(data2);
            await updateUser(data2);
            // api.users.update(userId, data2);
            history.push(`/users/${userId}`);
        };
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <i className="bi bi-gear"></i>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
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
                                defaultOption={
                                    defaultProfession
                                        ? defaultProfession.name
                                        : null
                                }
                                options={professionsList}
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
                            <MultiSelectField2
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultQuaties={defaultQualities}
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
