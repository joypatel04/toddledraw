import React from 'react';
import {View, Pressable, Text} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import localStyles from './styles';
import {darkCharcoal} from '../../themes/colors';

const ThankYouModal = ({
  showThankyouModal,
  onSavePress,
  onSharePress,
  onDonePress,
}) => (
  <Modal
    style={localStyles.modalContainer}
    animationIn="fadeIn"
    animationOut="fadeOut"
    isVisible={showThankyouModal}>
    <SafeAreaView style={localStyles.modalView}>
      <Text style={localStyles.modalTitleText}>
        {'Thanks for using Doodle Space'}
      </Text>
      <View style={localStyles.btnContainer}>
        <Pressable onPress={onSavePress} style={localStyles.saveBtn}>
          <View style={localStyles.saveBtn}>
            <Icon size={30} color={darkCharcoal} name="download-outline" />
            <Text style={localStyles.iconText}>Save</Text>
          </View>
        </Pressable>
        <Pressable onPress={onSharePress} style={localStyles.shareBtn}>
          <View style={localStyles.shareBtn}>
            <Icon size={30} color={darkCharcoal} name="share-social-outline" />
            <Text style={localStyles.iconText}>Share</Text>
          </View>
        </Pressable>
      </View>
      <View style={localStyles.btnContainer}>
        <Pressable onPress={onDonePress} style={localStyles.doneBtn}>
          <Text style={localStyles.doneText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  </Modal>
);

ThankYouModal.propTypes = {
  showThankyouModal: PropTypes.bool,
  onSavePress: PropTypes.func,
  onSharePress: PropTypes.func,
  onDonePress: PropTypes.func,
};

ThankYouModal.defaultProps = {
  showThankyouModal: false,
  onSavePress: () => {},
  onSharePress: () => {},
  onDonePress: () => {},
};

export default ThankYouModal;
