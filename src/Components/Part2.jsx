import React, {useState, useEffect} from 'react';

const Part2 = () => {

    const [state, setState] = useState({
        displayName: "",
        email: "",
        password: "",
        skills: "",
    });

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);

    const {email, password, displayName, skills} = state;

    const [offerText, setOfferText] = useState("Try it free 7 days then ₹180/mo. thereafter");
   

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value});
        checkFormFilled();
    };

  const allSkills = ["HTML", "CSS", "JS", "React", "NodeJs"];
  const [selectedSkill, setSelectedSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState(allSkills);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isRequired, setIsRequired] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({email: "", displayName:"", password:"",skills:""});
    setSelectedSkills([]);
    setAvailableSkills(allSkills);
    setIsRequired(true);
}
  
  const handleSkillChange = (event) => {
    const value = event.target.value;
    setSelectedSkills([...selectedSkills, value]);
    setSelectedSkill("");
    setAvailableSkills(availableSkills.filter((skill) => skill !== value));
    setIsRequired(false);
  }

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((selected) => selected !== skill));
    setAvailableSkills([...availableSkills, skill]);
  }
  
  useEffect(() => {
    setAvailableSkills(allSkills.filter((skill) => !selectedSkills.includes(skill)));
  }, [selectedSkills]);

  const checkFormFilled = () => {
    if(displayName !== '' && email !== '' && password !== '' && skills !== []) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }
  const handleText = () => {
    setOfferText("You have successfully subscribed to our plan ✓ ");
  }

  return (
    <div className='part2'>
        <div className='offer-text'>
            {offerText}
        </div>

        <div className='form-fill'>
            <form className='form-skills' onSubmit={handleSubmit}>
                <input 
                    type='text'
                    id='displayName'
                    className='form-control'
                    placeholder='Full Name'
                    name='displayName'
                    onChange={handleChange}
                    value={displayName}
                    required
                />
                <input 
                    type='email'
                    id='user-email'
                    className='form-control'
                    placeholder='Email Address'
                    name='email'
                    onChange={handleChange}
                    value={email}
                    required
                />
                <input 
                    type={isRevealPwd ? "text" : "password"}
                    id="inputPassword"
                    className='form-control'
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required
                />
                <select id="skills" value={skills} onChange={handleSkillChange} className='form-control' required={isRequired}>
                    <option value="" disabled>Choose your skills</option>
                    {availableSkills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>

                <div className="selected-skills">
                    {selectedSkills.map((skill) => (
                    <div key={skill} className="selected-skill">
                        <span>{skill}</span>
                        <h1 type="button" onClick={() => handleSkillRemove(skill)}>X</h1>
                    </div>
                    ))}
                </div>

                <button onClick={handleText} type='submit' style={{ backgroundColor: isFormFilled ? '#37cc8a' : 'gray71' }}>CLAIM YOUR FREE TRAIL</button>
                <p>By clicking the button you are agreeing to our <span> Terms and Services</span> </p>
            </form>
        </div>
    </div>
  )
}

export default Part2;