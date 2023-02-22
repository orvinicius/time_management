import styles from './Auth.module.css';
// import Message from "../../components/Message";

// Components
import { Link } from "react-router-dom";
import Message from '../../components/Message';

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword,
        };

        dispatch(register(user));
    };

    // Clean all auth states
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div className={styles.register}>
            <h2>Time Management</h2>
            <p className="subtitle">Cadastre-se para gerenciar suas tarefas e aumentar seu rendimento.</p>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => setName(e.target.value)}
                        value={name || ""}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email || ""}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ""}
                    />
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword || ""}
                    />
                    {!loading && <input type="submit" value="Cadastrar" />}
                    {loading && <input type="submit" value="Aguarde..." disabled />}
                </div>
                {error && <Message msg={error} type="error" />}
            </form>
            <p>
                Já possui conta? <Link to="/login">Clique aqui.</Link>
            </p>
        </div>
    );
};

export default Register;