import { useState } from "react";
import PropTypes from 'prop-types'
import "./checkbox-styles.css";

function Checkbox({description, commitChecked, teacherId}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label data-testid="custom-checkbox-label">
      <input
        type="checkbox"
        data-testid="custom-checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
          commitChecked(teacherId, !isChecked);
        }}
      />
        <svg
            className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
        >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={isChecked ? "#fff" : "none"}
        />
      </svg>
        {description}
    </label>
  );
}

Checkbox.propTypes = { 
    commitChecked: PropTypes.func.isRequired,
    teacherId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
};
export default Checkbox;


