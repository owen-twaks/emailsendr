import React,{ useState } from 'react';
import axios from 'axios';


const Form = () => {

	const [values, setValues] = useState({
		name: '',
		height: '',
		email: '',
	});
	const [submitted, setSubmitted] = useState(false);
	
    const handleNameInputChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			name: event.target.value
		}));
	};
	
	const handleHeightInputChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			height: event.target.value
		}));
	};
	
	const handleEmailInputChange = (event) => {
		event.persist();
		setValues((values) => ({
			...values,
			email: event.target.value
		}));
	};
	
	const handelSubmit = async (e) => {
		e.preventDefault();
		console.log(values)
		if(values.name && values.height && values.email) {
			await axios.post('/users', {
				name: values.name,
				height: values.height,
				email: values.email,
			}).then((res) => {
				console.log(res)
				setSubmitted(true);
				setValues({
					name: '',
		            height: '',
	            	email: '',
				})
			}).catch((error) => {
				console.log(error)
			})
		}
	}

	return (
		<form id='form' class='register-form' onSubmit={handelSubmit}>
		<h1>Register your details</h1>
		{submitted ? <div className='success-message'>success!! Thank you for registering</div> : null}
        <input
            id="name"
            class="form-field"
            type="text"
            placeholder="Please Enter Your Name"
            name="name"
            value={values.name}
            onChange={handleNameInputChange}
        />
        <input
            id="height"
            class="form-field"
            type="text"
            placeholder="Please Enter Your Height"
            name="height"
            value={values.height}
            onChange={handleHeightInputChange}
        />
        <input
            id="email"
            class="form-field"
            type="text"
            placeholder="Please Enter Your Email"
            name="email"
            value={values.email}
            onChange={handleEmailInputChange}
         />
		 
		 {/* <input id="Submit" value="Submit"/> */}
		 <button class="form-field" type="submit">
          Submit 
        </button>
		
    </form>

)
}


export default Form;
