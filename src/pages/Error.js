import Banner from '../components/Banner';

export default function Error() {

    const data = {
        title: "404 - Not found",
        content: "The page you are looking for cannot be found",
        destination: "/",
        buttonLabel: "Back to Workouts"
    }
    
    return (
        <div className='banner text-center'>
            <Banner data={data}/>
        </div>
    )
}