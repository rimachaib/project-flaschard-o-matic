# Flashcard-o-matic Application

This application was created to assist a local school put together a flashcard application, named Flashcard-o-matic, to help their students study online.  Teachers can use the application to create decks of flashcards for the subjects they teach and students are able study the decks.

This project required the installation of packages via NPM, running tests from the command line, writing React function components, creating routes using React Router, using various hooks including useState(), useParams(), and useHistory(), and styling using Bootstrap 4.

## The Home Screen

The Home Screen has five features:

1. A "Create Deck" button is displayed which brings the user to the create deck screen after the button is clicked.
2. Existing decks are displayed on the screen with the deck name and the number of cards.
3. Embedded inside the deck is a "View" button that brings the user to the Cards screen.
4. Embedded inside the deck is a "Study" button that brings the user to the Study screen.
5. Embedded inside the deck is a "Delete" button that shows a warning message before deleting the deck.  When the user clicks the "Delete" button, a warning message is shown and the user can click "Ok" or "Cancel".  If the user clicks "Ok" the deck is deleted and the deleted deck is no longer visible on the Home screen.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/home-screen.png)

## The Study Screen

The Study Screen has seven features:

1. A breadcrumb navigation bar with links to home, followed by the name of the deck being studied and finally the text "Study".
2. The deck title as a primary header.
3. The list of cards, shown one at a time, fornt side first.
4. A button at the bottom of each card, that "flips" it to the other side.
5. A "next" button is shown after the card is flipped to continue to the next card.
6. A "Restart" prompt is shown asking the user "Do you want to restart the deck?".
7. Studying a deck with two or fewer cards displays a "Not enough cards" message.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/study-screen.png)

## The Create Deck Screen

The Create Deck Screen is reached when a user clicks the "Create Deck" button, it contains the following features:

1. A breadcrumb navigation bar with a link to home, followed by the text "Create Deck".
2. A form is shown with two fields for creating a deck 1) a name input field and 2) the description field is a text area that can be multiple line of text.
3. A "submit" button that takes the user to the deck screen.
4. A "cancel" button that takes the user to the home screen.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/create-screen.png)

## The Deck Screen

The Deck Screen displays all of the information about a deck and contains the following features:

1. A breadcrumb navigation bar with a link to home, followed by the name of the deck.
2. A deck name and deck description with four buttons embedded in the deck.
3. A "Edit" button embedded inside the card that takes the user to the Edit Card Screen when clicked.
4. A "Study" button embedded inside the card that takes the user to the Study Screen when clicked.
5. A "Add Cards" button embedded inside the card that takes the user to the Add Card Screen when clicked.
6. A "Delete" button embedded inside the card that shows a warning message before deleting the card.  When the user clicks the "Delete" button, a warning message is shown and the user can click "Ok" or "Cancel".

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/deck-screen.png)

## The Edit Deck Screen

The Edit Deck Screen allows the user to modify information on an existing deck and contains the following features: 

1. A breadcrumb navigation bar with a link to home, followed by the name of the deck being edited, and finally the text Edit Deck.
2. A title header.
3. A form with the same input fields as the Add Card screen, except it is pre-filled with information for the existing card and can be edited and updated.
4. A "Cancel" button that takes the user to the Deck screen.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/edit-deck-screen.png)

## The Add Card Screen

The Add Card Screen allows the user to add a new card to an existing deck and contains the following features:

1. A breadcrumb navigation bar with a link to home, followed by the name of the deck to which the cards are being added, and finally the text Add Card.
2. A title header.
3. A form with front and back fields for creating a new card
4. A "Save" button that creates a new card associated with the relevant deck, then clears the form and the process for adding a card is restarted.
5. A "Done" button that takes the user to the Deck screen.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/add-card-screen.png)

## The Edit Card Screen

The Edit Card Screen allows the user to modify information on an existing card and contains the following features:

1.  A breadcrumb navigation bar with a link to home, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card that includes the card Id.
2.  A header titled "Edit Card".
3.  A form with the same input fields as the Add Card screen, except it is pre-filled with information for the existing card and can be edited and updated.
4.  A "Save" button that takes the user to the Deck Screen.
5.  A "Cancel" button that takes the user to the Deck Screen.

![Settings Window](https://raw.github.com/rimachaib/project-flashcard-o-matic/main/screenshots/edit-card.png)

