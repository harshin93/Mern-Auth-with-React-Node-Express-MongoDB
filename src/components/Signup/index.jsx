import {userState} from 'react';
import {Link, userNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './styles.modules.css';

const Signup = () => {
    const [data, setData] = userState({
        firstName:"",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError] = userState("");
    const navigate = userNavigate();

    const handleChange = ({currentTarget: input}) =>{
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const url = "https://localhost:8080/api/uesrs";
            const {data: res} = await axios.post(url, data);
            navigate("/login")
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    setError(error.response.data.message)
                }
        }
    }

    return (
        <div className={styles.Signup_container}>
           <div className={styles.Signup_form_container} onSubmit={handleSubmit}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                <link to="/login">
                    <button type='button' className={styles.white_btn}>
                        Sign in
                    </button>
                </link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Create Account</h1>
                        <input
                        type="text"
                        placeholder='First Name'
                        name='firstName'
                        onChange={handleChange}
                        value={data.firstName}
                        required
                        className={styles.input}>

                        </input>
                        <input
                        type="text"
                        placeholder='Last Name'
                        name='lasttName'
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        className={styles.input}>

                        </input>
                        <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}>

                        </input>
                        <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}>

                        </input>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            
            </div> 
        </div>
    )
}

export default Singup;