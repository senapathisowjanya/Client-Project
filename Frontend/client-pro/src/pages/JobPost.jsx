import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import './jobPost.css';

const JobPost = () => {
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [positionType, setPositionType] = useState([]);
  const [questions, setQuestions] = useState(['']);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePositionTypeChange = (e) => {
    const selectedPositionType = e.target.value;
    if (positionType.includes(selectedPositionType)) {
      setPositionType(positionType.filter((type) => type !== selectedPositionType));
    } else {
      setPositionType([...positionType, selectedPositionType]);
    }
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    let obj = {
      position,
      description,
      positionType,
      questions,
    };
    console.log(obj);
  };

  return (
    <div className="container w-50 shadow">
      <form onSubmit={handleFormSubmit} className="text-center p-3">
        <center>
          <h4>Job Post</h4>
          <p className="status">Status: Draft</p>
        </center>

        <div className="form-group text-start">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={position}
            onChange={handlePositionChange}
          />
        </div>
        <div className="form-group text-start">
          <label htmlFor="description">Job Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="5"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="form-group text-start">
          <label>Position Type</label>
          <div className="d-flex flex-wrap justify-content-start">
            <div className="form-check gap-2">
              <input
                type="checkbox"
                className="form-check-input checkbox-input"
                id="positionTypeW2"
                value="W2"
                checked={positionType.includes('W2')}
                onChange={handlePositionTypeChange}
              />
              <label className="form-check-label" htmlFor="positionTypeW2">
                W2
              </label>
            </div>
            <div className="form-check gap-2">
              <input
                type="checkbox"
                className="form-check-input checkbox-input"
                id="positionTypeC2H"
                value="C2H"
                checked={positionType.includes('C2H')}
                onChange={handlePositionTypeChange}
              />
              <label className="form-check-label" htmlFor="positionTypeC2H">
                Contract to Hire (C2H)
              </label>
            </div>
            <div className="form-check gap-2">
              <input
                type="checkbox"
                className="form-check-input checkbox-input"
                id="positionTypeC2C"
                value="C2C"
                checked={positionType.includes('C2C')}
                onChange={handlePositionTypeChange}
              />
              <label className="form-check-label" htmlFor="positionTypeC2C">
                Corp to Corp (C2C)
              </label>
            </div>
          </div>
        </div>
        <div className="form-group text-start">
          <label htmlFor="newQuestion">Add a New Question</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              id="newQuestion"
              value={questions[0]}
              onChange={(e) => handleQuestionChange(e, 0)}
            />
            <FaPlus className="cursor-pointer" onClick={handleAddQuestion} />
          </div>
          {questions.slice(1).map((question, index) => (
            <div className="d-flex align-items-center mt-2" key={index + 1}>
              <input
                type="text"
                className="form-control me-2"
                value={question}
                onChange={(e) => handleQuestionChange(e, index + 1)}
              />
              <FaTimes
                className="cursor-pointer"
                onClick={() => handleRemoveQuestion(index + 1)}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mx-auto d-block">
          Publish
        </button>
      </form>
    </div>
  );
};

export default JobPost;
