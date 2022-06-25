import './../index.css';
import usericon from '../assets/user-icon.png';
import { Link } from 'react-router-dom';

function FloatGui(data) {
    return (
        <Link to={data.linkto}>
            <img src={usericon} className="floating-button unselectable" alt="logo" id="float-button" />
        </Link>
    )
}

export default FloatGui