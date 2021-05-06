//Allows the user to add a new card to an existing deck
//The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new)
//You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.  import {readDeck} from "../utils/api/index.js";
//There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
//The screen displays the "React Router: Add Card" deck title.
//There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
//The screen displays the "React Router: Add Card" deck title.
//A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
//If the user clicks "Save", a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
//If the user clicks "Done", the user is taken to the Deck screen.*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import ErrorMessage from "../Layout/ErrorMessage";

function AddCard() {
	const { deckId } = useParams(); //AddCard component should be able to access the deckId parameter from the provided url

	//Create an initialFormState variable and initialize it to an empty string for the front and back <textarea> of the card form inputs.
	const initialState = {
		front: "",
		back: "",
		deckId,
	};
	const [error, setError] = useState(undefined);
	const [currentDeck, setCurrentDeck] = useState({ name: "", description: "" });
	const [formData, setFormData] = useState({ ...initialState }); //Set the initial state of the formData to the initialState variable.

	const abortController = new AbortController(); //Create new instance of AbortController, which is a special built-in object to be used in our useEffect hook

	useEffect(() => {
		async function loadData() {
			try {
				const dataFromAPI = await readDeck(deckId);
				setCurrentDeck(dataFromAPI);
			} catch (error) {
				if (error.name !== "AbortError") {
					console.error(error);
				}
			}
		}
		loadData();
		return () => {
			abortController.abort(); //cancels any pending request or response
		};
	}, [deckId]);

	const handleChange = ({ target }) => {
		const value = target.value;

		setFormData({
			...formData,
			[target.name]: value,
		});
	};

	const handleReset = (event) => {
		setFormData({ ...initialState });
	};
	//Upon form submission make another API call via the createCard function to save the card
	const handleSubmit = (event) => {
		event.preventDefault();

		createCard(deckId, formData, abortController.signal)
			.then(handleReset())
			.catch(setError);

		if (error) {
			return <ErrorMessage error={error} />;
		}
		return () => abortController.abort();
	};

	useEffect(() => {
		readDeck(deckId).then(setCurrentDeck);
	}, [deckId]); //Array of dependencies includes deckID, so the effect will rerun only when the value of deckID changes

	//currentDeck should be truthy after the API call returns
	if (currentDeck) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li className="breadcrumb-item" aria-current="page">
							<a href={`/decks/${currentDeck.id}`}>{currentDeck.name}</a>
						</li>
						<li class="breadcrumb-item active" aria-current="page">
							Add Card
						</li>
					</ol>
				</nav>
				<h1>{currentDeck.name}: Add Card</h1>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="front" className="form-label">
							Front Side
						</label>
						<textarea
							type="textarea"
							className="form-control"
							id="front"
							name="front"
							placeholder="Front Side"
							onChange={handleChange}
							value={formData.front}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">
							Back Side
						</label>
						<textarea
							type="textarea"
							className="form-control"
							id="back"
							name="back"
							placeholder="Back Side"
							onChange={handleChange}
							value={formData.back}
						/>
					</div>
					<input
						class="btn btn-secondary mr-3"
						type="reset"
						onClick={handleReset}
						value="Reset"
					></input>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
	return "Loading..."; //Component should display "Loading" until the fetch() call returns and calls setCurrentDeck with the deckId
}

export default AddCard;
