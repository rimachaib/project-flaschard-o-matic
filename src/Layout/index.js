import React from "react";
import Header from "./Header";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";

//Build up route paths in Layout
function Layout() {
	return (
		<div>
			<Header />
			<div className="container">
				{/* TODO: Implement the screen starting here */}
				<Switch>
					{/*<Switch> component makes sure that only one route shows at any one time, all of my routes will go inside this switch component.  Now set up my individual routes.  I'll create a route for each individual page that I have. Based on the instructions I want seven different pages to start*/}
					<Route exact={true} path="/">
						{/*<Route> component's responsibility is to render some UI when its path matches the current URL.  The path property will be my route*/}
						<Home />
						{/*This will show the <Home /> component when the user visits the route path "/"*/}
					</Route>
					<Route path="/decks/new">
						<CreateDeck />
					</Route>
					<Route path="/decks/:deckId/edit">
                      {/*:deckId is a URL parameter, and is a placeholder in the URL that begins with a :, we indicate deckId is a parameter by preceding it with the parameter token :. To gain access to these route params we will use a useParams() hook in our corresponding Component files any time we need to access the params*/}
						<EditDeck />
					</Route>
					<Route path="/decks/:deckId/study">
						<Study />
					</Route>
					<Route path="/decks/:deckId/cards/new">
						<AddCard />
					</Route>
					<Route path="/decks/:deckId/cards/:cardId/edit">
						<EditCard />
					</Route>
					<Route path="/decks/:deckId">
						<Deck />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Layout;
//ES6 syntax is used for importing and exporting.
//Keyword "export" is used to export objects from a file.
//When a file has a single export, or when one of the things exported will be used more often than others, you can set a default export instead of a named export as done above.
