export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}
// This is just used to show loading circle symbol while our data is fetched from DB