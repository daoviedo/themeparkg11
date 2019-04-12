import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Image1 from './images/test1.jpg';
import Image2 from './images/test2.jpg';
import './css/main.css';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                
			<header>
				<TopBar/>
			</header>

			<section id="banner">
				<div className="inner">
					<header>
						<h1>Welcome to ThemePark G11</h1>
					</header>

					<div className="flex">

						<div>
							<span className="icon fa-users"></span>
							<h3>Family</h3>
							<p>Experience it with the ones<br/>you love most</p>
						</div>

						<div>
							<span className="icon fa-rocket"></span>
							<h3>Entertainment</h3>
							<p>Enjoy unlimited rides<br/>and entertainment</p>
						</div>

						<div>
							<span className="icon fa-cutlery"></span>
							<h3>Dining</h3>
							<p>Dine at our famous season<br/>choices and concessions</p>
						</div>

					</div>

					<footer>
						<a href="/park-tickets" className="button">Buy Tickets</a>
					</footer>
				</div>
			</section>


	
			<section id="three" className="wrapper align-center">
				<div className="inner">
					<div className="flex flex-2">
						<article>
							<div className="image round">
								<img src={Image1} alt="Pic 01" />
							</div>
							<header>
								<h3>Rides And Entertainment</h3>
							</header>
							<p>Make sure to visit all of our available rides!<br />You can see a list of available rides and<br />entertainment by clicking below.</p>
							<footer>
								<a href="/rides" className="button">View Rides</a>
							</footer>
						</article>
						<article>
							<div className="image round">
								<img src={Image2} alt="Pic 02" />
							</div>
							<header>
								<h3>Restaurants and Concessions</h3>
							</header>
							<p>Choose from our top-rated restaurants like<br />like Pizza Palace, or grab a snack at any<br />nearby concession stand!</p>
							<footer>
								<a href="/dining" className="button">View Diners</a>
							</footer>
						</article>
					</div>
				</div>
			</section>

		
			<footer id="footer">
				<div className="inner">
					<div className="copyright">
						<a href="#c">&copy; ThemeParkG11. Created By: Daniel Oviedo | Ricardo Useche | Nic Graves</a>.
					</div>
				</div>
			</footer>
            </React.Fragment>
        );
    }
}
export default Home;