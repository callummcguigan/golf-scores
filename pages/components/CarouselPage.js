import Carousel from 'react-bootstrap/Carousel'
import Link from 'next/link'

function CarouselPage() {
    return (



        <Carousel>




            <Carousel.Item>
                <div className='fixedHeight'>
                    <img
                        className="d-block w-100 opacity"
                        src="/img1.jpg"
                        alt="First slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3 className='blackText'>Enter A New Score</h3>
                    <Link href="/AddScore">
                        <a className="navLink">Add Score</a>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='fixedHeight'>
                    <img
                        className="d-block w-100 opacity"
                        src="/img2.jpg"
                        alt="Second slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3 className='blackText'>View My Previous Scores</h3>
                    <Link href="/ViewScores">
                        <a className="navLink">View My Scores</a>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className='fixedHeight'>
                    <img
                        className="d-block w-100 opacity"
                        src="/img3.jpg"
                        alt="Third slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3 className='blackText'>View User's Published Scores</h3>
                    <Link href="/ViewPublishedRounds">
                        <a className="navLink">View Published Scores</a>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

    );
}

export default CarouselPage;