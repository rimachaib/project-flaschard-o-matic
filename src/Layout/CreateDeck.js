//The path to this screen should be /decks/new.
/*Different components on the page
1) Breadcrumb navigation
2) Header
3) Form
4) Cancel Button
5) Submit Button

*/
//There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
//A form is shown with the appropriate fields for creating a new deck.
//The name field is an <input> field of type text.
//The description field is a <textarea> field that can be multiple lines of text.
//Once the form template has been returned, store the user's input into a component state.
//If the user clicks "submit", the user is taken to the Deck screen.
//If the user clicks "cancel", the user is taken to the Home screen.
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"; //We are destructuring the link tag here and importing it from react-router-dom
import { createDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

function CreateDeck() {
	const initialFormState = {
		name: "",
		description: "",
	}; //Create an initialFormState variable and initialize it to an empty string for the name and description form inputs.
	const [formData, setFormData] = useState({ ...initialFormState }); //The initial state stored in formData is created from the initialFormState object.
	const history = useHistory();
	const [error, setError] = useState(undefined);

	const handleCancel = (event) => {
		history.push("/");
	};

	const handleChange = ({ target }) => {
		const value = target.value; //target.value references the current contents of the input field.

		setFormData({
			...formData, //spread operator ... to include all of the contents of the existing formData variable and add the new value to the very end.
			[target.name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault(); //prevents the default behavior of form submissions
		const abortController = new AbortController();

		createDeck(formData, abortController.signal)
			.then((data) => setFormData(data))
			.catch(setError);

		return () => abortController.abort();
	};
	useEffect(() => {
		if (formData.id) {
			history.push(`/decks/${formData.id}`);
		}
	}, [formData]);
	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (formData)
		return (
			<div>
				{/*-----Breadcrumb Navigation-----*/}
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Create Deck
						</li>
					</ol>
				</nav>
				{/*-----Page Header-----*/}
				<h1>Create Deck</h1>
				{/*-----Create New Deck Form-----*/}
				<form onSubmit={handleSubmit}>
					{/*To capture the submission event, use the onSubmit event in the form */}
					<div className="form-group">
						<label htmlFor="name">
							{/*Label element with a htmlFor attribute specifying which element the label is bound to based on id */}
							Name
							<input
								className="form-control"
								type="text"
								id="name"
								name="name"
								onChange={handleChange}
								value={formData.name}
								placeholder="Deck Name"
							/>
							{/*Input field contains the onChange attribute that will handle, any time any change happens in the name input field, the handleNameChange handler is called which in turn updates the name variable in state*/}
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="textArea">
							Description
							<textarea
								className="form-control"
								type="text"
								id="textArea"
								onChange={handleChange}
								value={formData.description}
								rows="7"
								placeholder="Brief description of the deck"
							></textarea>
						</label>
					</div>
				</form>
				{/*-----Cancel Create Deck Form Button-----*/}
				<Link to="/">
					<button type="cancel" className="btn btn-secondary" onClick={handleCancel}>
						Cancel
					</button>
				</Link>
				{/*-----Submit Create Deck Form Button-----*/}
				<Link to="/decks/deckId">
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Link>
			</div>
		);
}

export default CreateDeck;
