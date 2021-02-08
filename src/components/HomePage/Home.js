import {React,Component} from '../../noser-hris-component';
import Banner from "../Nav/Banner"
class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <div className="noser-home">
                {/* <span>Noser Hris © 2019-2020. All Rights Reserved</span> */}
                </div>
            </div>
        );
    }
}

export default Home;
