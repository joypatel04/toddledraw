import React, {Component} from 'react';
import Shade from './Shade';

import {getColorFromHSL} from '../../../../utils/colorUtils';

const shadeStep = 20;
const maximumLightnessValue = 1;

class LightnessShade extends Component {
  shouldComponentUpdate(nextProps) {
    const {color} = this.props;
    if (nextProps.color.h !== color.h || nextProps.color.l !== color.s) {
      return true;
    }
    return false;
  }

  getShadeColor = (i) => {
    const {color} = this.props;
    return getColorFromHSL({...color, l: i});
  };

  render() {
    return (
      <Shade
        shadeStep={shadeStep}
        getShadeColor={this.getShadeColor}
        maximumValue={maximumLightnessValue}
      />
    );
  }
}

export default LightnessShade;
