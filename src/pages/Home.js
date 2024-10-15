import Banner from '../components/Banner';
import { Carousel, Row, Col } from 'react-bootstrap';
// import FeaturedCourses from '../components/FeaturedCourses';
// import Highlights from '../components/Highlights';

export default function Home() {

    const data = {
        title: "Welcome to our Blog App",
        content: "Follow and keep in touch with new knowledge, facts, and experiences!",
        destination: "/login",
        buttonLabel: "Start Now"
    }


    return (
        <div className='banner text-center'>
            <Banner data={data}/>
        </div>
  );
}
