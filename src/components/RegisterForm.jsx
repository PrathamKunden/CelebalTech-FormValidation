
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import FormInput from './formInput.jsx';
// import "../App.css"
import "./RegisterForm.css"

function RegisterForm() {
  const navigate = useNavigate();

  const [formVals, setFormVals] = useState({
    firstName: '',
    lastName : '',
    userName : '',
    password : '',
    aadharNo : '',
    panNo    : '',
    country  : '',
    state    : '',
    city     : '',
    phoneNumber: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeHolder: 'Enter first name',
      errorMessage: "Only letters allowed (3-16 chars)",
      required: true,
      pattern: '^[A-Za-z]{3,16}$'
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeHolder: 'Enter last name',
      errorMessage: "Only letters allowed (3-16 chars)",
      required: true,
      pattern: '^[A-Za-z]{3,16}$'
    },
    {
      id: 3,
      name: 'userName',
      type: 'text',
      label: 'Username',
      placeHolder: 'Choose a username',
      errorMessage: "Only letters & numbers (3-16 chars)",
      required: true,
      pattern: '^[A-Za-z0-9]{3,16}$'
    },
    {
      id: 4,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage: "Enter a valid email address.",
      required: true,
      pattern: "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      label: 'Password',
      placeHolder: 'Create a password',
      errorMessage: "Min 8-20 chars with number & special character",
      required: true,
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$'
    },
    {
      id: 6,
      name: 'aadharNo',
      type: 'text',
      label: 'Aadhar Number',
      placeHolder: '12-digit Aadhar',
      errorMessage: "Must be 12 digits, not starting with 0 or 1",
      required: true,
      pattern: '^[2-9]{1}[0-9]{11}$'
    },
    {
      id: 7,
      name: 'panNo',
      type: 'text',
      label: 'PAN Number',
      placeHolder: 'ABCDE1234F',
      errorMessage: "Format: 5 letters, 4 digits, 1 letter",
      required: true,
      pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
    },
    {
      id: 8,
      name: "phoneNumber",
      type: "tel",
      label: "Phone Number",
      placeholder: "Phone Number",
      errorMessage: "Enter a valid 10-digit phone number.",
      required: true,
      pattern: "^[0-9]{10}$"
    }    

  ];

  // Country-state-city dropdown values
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCode, setSelectedCode] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);



  const handleCountry = (val) => {
    setSelectedCountry(val);
    setStates(State.getStatesOfCountry(val.isoCode));
    setCities([]);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleState = (val) => {
    setSelectedState(val);
    setCities(City.getCitiesOfState(selectedCountry.isoCode, val.isoCode));
    setSelectedCity(null);
  };

  const handleCity = (val) => {
    setSelectedCity(val);
  };



  const onChange = (e) => {
    setFormVals(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store selected values
    const finalData = {
      ...formVals,
       phone: selectedCode ? `+${selectedCode}-${formVals.phoneNumber}` : "",
      country: selectedCountry?.name || '',
      state: selectedState?.name || '',
      city: selectedCity?.name || ''
    };

    // Simulate submitting to backend or save to context/store
    navigate('/result', { state: finalData });
  };



  return (
    <div className=" register-form app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-grid">

          {inputs.map((input, idx) => {
            if (input.name === "phoneNumber") {
              return (
               
                <React.Fragment key={input.id}>
                  <select
                    className="form-select"
                    value={selectedCode}
                    onChange={(e) => setSelectedCode(e.target.value)}
                    required
                  >
                    <option value="">Code</option>
                    {countries.map((c) => (
                      <option key={c.isoCode} value={c.phonecode}>
                       {c.name} { } +{c.phonecode}
                      </option>
                    ))}
                  </select>
                
                  <FormInput
                    {...input}
                    value={formVals[input.name]}
                    onChange={onChange}
                  />
                </React.Fragment>
                
              );
            } else {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={formVals[input.name]}
                  onChange={onChange}
                />
              );
            }
          })}


          {/* Country dropdown */}
          <div className="col">
              <select
                className="form-select"
                value={selectedCountry?.isoCode || ''}
                onChange={(e) =>
                  handleCountry(
                    countries.find(c => c.isoCode === e.target.value)
                  )
                }
                required
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* State dropdown */}
            <div className="col">
              <select
                className="form-select"
                disabled={!selectedCountry}
                value={selectedState?.isoCode || ''}
                onChange={(e) =>
                  handleState(
                    states.find(s => s.isoCode === e.target.value)
                  )
                }
                required
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* City dropdown */}
            <div className="col">
              <select
                className="form-select"
                disabled={!selectedState}
                value={selectedCity?.name || ''}
                onChange={(e) =>
                  handleCity(
                    cities.find(c => c.name === e.target.value)
                  )
                }
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
        
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;



