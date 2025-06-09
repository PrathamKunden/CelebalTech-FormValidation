import { useLocation, useNavigate } from 'react-router-dom';
import "./SubmissionResult.css"

function SubmissionResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div>
        <h2>No data submitted</h2>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='result'>

        <h2 >Submitted Data</h2>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/CelebalTech-FormValidation')}>Back to Form</button>
      </div>
    </div>
  );
}

export default SubmissionResult;
