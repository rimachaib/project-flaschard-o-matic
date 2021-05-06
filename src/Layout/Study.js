//The Study screen is displayed at /decks/:deckId/study.
//You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
//There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
//The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
//Cards are shown one at a time, front-side first.
//A button at the bottom of each card "flips" it to the other side.
//After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
//After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
//If the user does not restart the deck, they should return to the home screen.
//Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

export const Study = () => {
	const { deckId } = useParams();
	const [deck, setDeck] = useState({ cards: [] });
	const [error, setError] = useState(undefined);
	const [flipped, setFlipped] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);

	useEffect(() => {
		const abortController = new AbortController();
		async function getDeck() {
			try {
				let data = await readDeck(deckId, abortController.signal);
				setDeck(data);
			} catch (err) {
				setError(err);
			}
		}
		getDeck();
		return () => abortController.abort();
	}, [deckId]);

	if (error) {
		return <ErrorMessage error={error} />;
	}

	function nextCard() {
		if (cardIndex === deck.cards.length - 1) {
			const result = window.confirm("Do you want to restart the deck?");
			if (result) {
				setCardIndex(0);
			}
		} else {
			setCardIndex(cardIndex + 1);
		}
		setFlipped((prevState) => !prevState);
	}

	function flipCard() {
		setFlipped((prevState) => !prevState);
	}

	if (deck) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="/">
								<span className="oi oi-home" /> Home
							</a>
						</li>
						<li className="breadcrumb-item" aria-current="page">
							<a href={`/decks/${deck.id}`}>{deck.name}</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Study
						</li>
					</ol>
				</nav>
				<h1>Study: {deck.name}</h1>
				<div className="col-sm-12">
					{deck.cards.length > 2 ? (
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">
									Card {cardIndex + 1} of {deck.cards.length}
								</h5>
								<p className="card-text">
									{!flipped
										? `${deck.cards[cardIndex].front}`
										: `${deck.cards[cardIndex].back}`}
								</p>
								<button className="btn btn-secondary m-2" onClick={flipCard}>
									<span className="oi oi-action-redo" /> Flip
								</button>
								{flipped && (
									<button className="btn btn-primary" onClick={nextCard}>
										<span className="oi oi-arrow-thick-right" /> Next
									</button>
								)}
							</div>
						</div>
					) : (
						<div>
							<h3>Not enough cards.</h3>
							<p>
								You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
							</p>
                      <button type="button" className="btn btn-primary">
							<Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary"> Add Cards
							</Link>
                      </button>
						</div>
					)}
				</div>
			</div>
		);
	}
};
export default Study;
