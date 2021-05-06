//This component is rendered in the Home.js file
//Show list of decks with options to create, study, view, or delete a deck
//Existing decks are each shown with the deck name, the number of cards, and a “Study,” “View,” and “Delete” button.
//useEffect hook will fire a function after every render and will allow us to fetch data
//A dependency array can be passed into the useEffect as a second argument to make sure that the function only rns once on the first render
//Clicking the “Study” button brings the user to the Study screen.
//Clicking the “Edit” button brings the user to the Edit Deck screen.
//Clicking the “Delete” button shows a warning message before deleting the deck.
//The user can click "OK" or "Cancel". If the user clicks "OK", the deck is deleted and the deleted deck is no longer visible on the Home screen.
//use useEffect hook to make an API call from a React component

import React, { useState, useEffect } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

export const List = () => {
	const history = useHistory();

	const [decks, setDecks] = useState([]);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const abortController = new AbortController();
		async function getData() {
			try {
				let data = await listDecks(abortController.signal);

				setDecks(data);
			} catch (err) {
				setError(err);
			}
		}
		getData();
		return () => abortController.abort();
	}, []);

	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (decks) {
		const list = decks.map((deck) => {
			return (
				<div key={deck.id} className="card col-md-10">
					<div className="card-body">
						<div className="row">
							<div className="col-md-8">
								<h5 className="card-title">{deck.name}</h5>
							</div>
							<div className="col-md-4">
								<p className="text-end">{`${deck.cards.length} cards`}</p>
							</div>
						</div>
						<p className="card-text">{deck.description}</p>

						<Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
							View
						</Link>

						<Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
							Study
						</Link>

						<button
							className="btn btn-danger"
							onClick={async () => {
								const result = window.confirm(
									"Delete this deck? \nYou will not be able to recover it."
								);
								if (result) {
									deleteDeck(deck.id).then(history.push("/"));
								}
							}}
						>
							Delete
						</button>
					</div>
				</div>
			);
		});

		return (
			<main className="container">
				<div>
					<Link to="decks/new" className="btn btn-secondary m-3">
						Create Deck
					</Link>
				</div>
				<section className="row">{list}</section>{/*list holds the results of our map to each deck */}
			</main>
		);
	}
	return (
		<div className="p-4 border border-top-0">
			<p>Loading...</p>
		</div>
	);
};
export default List;
