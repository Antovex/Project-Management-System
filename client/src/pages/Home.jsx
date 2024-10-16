import Clients from "../components/Clients";
import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Projects from "../components/Projects";

// This Page is responsible to load all the component for Home page

export default function Home() {
    return (
        <>
            {/* <div className="mb-4">
            <Projects />
            <AddProjectModal />
        </div>
        <div>
            <hr />
            <Clients />
            <AddClientModal />
        </div> */}
            <div className="mb-4 home-page">
                <div className="projects-section">
                    <Projects />
                    <AddProjectModal />
                </div>
                <div className="mt-4 clients-section">
                    <Clients />
                    <AddClientModal />
                </div>
            </div>
        </>
    )
}
