import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/PasswordStrengthMeter.css';

class PasswordStrengthMeter extends Component {
    convertScoreToLabel = (score) => {
        switch(score) {
            case 0:
              return 'Weak';
            case 1:
              return 'Weak';
            case 2:
              return 'Fair';
            case 3:
              return 'Good';
            case 4:
              return 'Strong';
            default:
              return 'Weak';
        }
    }
    render() {
        const { score } = this.props; 
        return (
            <div className="password-strength-meter">
                <progress className={`password-strength-meter-progress strength-${this.convertScoreToLabel(score)}`} value={score} max="4"/>
                <label className="password-strength-meter-label">
                  <strong>Password Strength:</strong> {this.convertScoreToLabel(score)}
                </label>
            </div>
        )
    }
};

PasswordStrengthMeter.propTypes = {
  score: PropTypes.number
}

export default PasswordStrengthMeter;