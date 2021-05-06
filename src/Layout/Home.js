//The path to this screen should be /.
//Render the <DeckList /> Component in the Home component.  The <DeckList /> Component will have the existing decks along with deck name, the number of cards, and the"Create Deck", “Study,” “View,” and “Delete” buttons.

import React from "react";
import DeckList from "./DeckList";

function Home() {
	return (
		<div>
			<DeckList />
		</div>
	);
}

export default Home;
