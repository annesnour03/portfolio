import './../index.css';
import home from '../assets/home.svg';
import { Link } from 'react-router-dom';

function FloatGui(data) {
    return (
        <Link to={data.linkto}>
                

            <img src={home} className="floating-button unselectable" alt="logo" id="float-button" />
        </Link>
    )
}

export default FloatGui