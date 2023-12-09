import { useUser } from "../contexts/UserContext";

const Home = () => {
    const { user } = useUser();
    return (
        <div>
            <h1>{`Hello ${user.userName}`}</h1>
        </div>
    )
}

export default Home;