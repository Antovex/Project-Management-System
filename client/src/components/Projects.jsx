import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS } from "../queries/projectQueries";

// This component is used to get the data form the DB and send 
// all each projects data to ProjectCard component 

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <Spinner/>
    if (error) return <p>Something went wrong</p>

    return (
        <>
        { data.projects.length > 0 ? (
            <div className="row mt-3">
                { data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        ) : (<p>No Projects</p>) }
        </>
    )
}
