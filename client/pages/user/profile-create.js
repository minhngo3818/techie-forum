import { Form, Button, Carousel } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
import AuthGuard from "../../services/auth/AuthGuard";

// This page for new user to create their profile

// If each page are filled in its fields
// Then allow to move to next crousel
// Add loading state with different message between two page
// Estimate 3 pages forms
const ProfileCreate = () => {
  return (
    <>
      <PageHeader pageName="Profile Create Page" />
    </>
  );
};

export default AuthGuard(ProfileCreate);
