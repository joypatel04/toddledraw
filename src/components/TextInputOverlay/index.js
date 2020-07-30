import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import localStyles from './styles';
import {modalOverlay} from '../../themes/colors';

const TextInputOverlay = ({
  pointerEvents,
  forwardedRef,
  onActiveTextInput,
  onDeactiveTextInput,
  isActiveText,
  onChangeTextList,
}) => {
  const backgroundOverlay = {
    backgroundColor: isActiveText ? modalOverlay : 'transparent',
  };

  const [input, setInput] = useState('');
  const [fontSize, setFontSize] = useState(wp('10%'));

  const zIndex = {
    zIndex: isActiveText ? 1 : 0,
  };

  const getFontSize = (textLength) => {
    let newFontSize = wp('10%');
    if (textLength >= 250) {
      newFontSize = wp('3%');
    } else if (textLength > 180) {
      newFontSize = wp('5%');
    } else if (textLength > 80) {
      newFontSize = wp('7%');
    } else if (textLength > 40) {
      newFontSize = wp('9%');
    }
    return newFontSize;
  };

  const textFontSize = {
    fontSize: fontSize,
  };

  return (
    <View
      pointerEvents={pointerEvents}
      style={[localStyles.container, backgroundOverlay, zIndex]}>
      <View style={localStyles.dummyView} />
      <View style={[localStyles.textInputBtn]}>
        <TextInput
          multiline
          maxLength={400}
          numberOfLines={4}
          style={[localStyles.textInput, textFontSize]}
          ref={forwardedRef}
          onFocus={() => onActiveTextInput()}
          onBlur={() => {
            if (input.length) {
              onChangeTextList(input);
            }
            onDeactiveTextInput();
          }}
          returnKeyType="default"
          onChangeText={(text) => {
            if (text.length >= 70) {
              setFontSize(getFontSize(text.length));
            } else if (text.length >= 90) {
              setFontSize(getFontSize(text.length));
            } else if (text.length < 70) {
              setFontSize(wp('10%'));
            }
            setInput(text);
          }}
          onSubmitEditing={() => {
            if (forwardedRef && forwardedRef.current) {
              if (forwardedRef.current.isFocused()) {
                forwardedRef.current.blur();
              }
            }

            if (input.length) {
              onChangeTextList(input);
            }
          }}>
          <Text style={localStyles.input}>{input}</Text>
        </TextInput>
      </View>
    </View>
  );
};

TextInputOverlay.propTypes = {
  pointerEvents: PropTypes.string,
  forwardedRef: PropTypes.any,
  onActiveTextInput: PropTypes.func,
  onDeactiveTextInput: PropTypes.func,
};

export default TextInputOverlay;
