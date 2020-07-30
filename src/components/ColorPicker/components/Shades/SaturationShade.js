import React, {Component} from 'react';
import Shade from './Shade';
import {getColorFromHSL} from '../../../../utils/colorUtils';

const shadeStep = 20;
const maximumSaturationValue = 1;

class SaturationShade extends Component {
  shouldComponentUpdate(nextProps) {
    const {color} = this.props;
    if (nextProps.color.h !== color.h || nextProps.color.l !== color.l) {
      return true;
    }
    return false;
  }

  getShadeColor = (i) => {
    const {color} = this.props;
    return getColorFromHSL({...color, s: i});
  };

  render() {
    return (
      <Shade
        shadeStep={shadeStep}
        getShadeColor={this.getShadeColor}
        maximumValue={maximumSaturationValue}
      />
    );
  }
}

export default SaturationShade;
