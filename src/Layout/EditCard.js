//The Edit Card screen allows the user to modify information on an existing card.
//The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
//You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
//There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
//It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.
//If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
//useParams returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.
import { updateCard, readCard, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";
import CardForm from "./CardForm";

function EditCard() {
	const { deckId, cardId } = useParams();
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(undefined);
	const [deck, setDeck] = useState({});

	useEffect(() => {
		readCard(cardId).then(setFormData);
		readDeck(deckId).then(setDeck);
	}, [cardId, deckId]);

	const handleChange = ({ target }) => {
		const value = target.value;

		setFormData({
			...formData,
			[target.name]: value,
		});
	};

	const handleReset = (event) => {
		readCard(cardId).then(setFormData);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const abortController = new AbortController();
		updateCard(formData, abortController.signal).then().catch(setError);

		if (error) {
			return <ErrorMessage error={error} />;
		}
	};

	if (formData && deck) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="/">
								<span className="oi oi-home" /> Home
							</a>
						</li>
						<li className="breadcrumb-item">
							<Link to={`/decks/${deckId}`}>{deck.name}</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Edit Card {`${cardId}`}
						</li>
					</ol>
				</nav>
				<h1>Edit Card</h1>
				<CardForm
					formData={formData}
					handleChange={handleChange}
					handleReset={handleReset}
					handleSubmit={handleSubmit}
				/>
			</div>
		);
	}
}

export default EditCard;
