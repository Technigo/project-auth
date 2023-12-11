// This component represents a "Go Back" button to navigate back to the list of movies. It's a reusable component.
import { Link } from 'react-router-dom';

export function BackButton() {
  return (
    <div className="button-wrapper">
      <Link to="/" className="button">
        Go Back
      </Link>
    </div>
  );
}