import React, {Component} from 'react';
import {
  View,
  PanResponder,
  ImageBackground,
  Pressable,
  Platform,
} from 'react-native';
import idx from 'idx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path, G} from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';

import AnimatedComponent from '../../components/AnimatedComponent';
import SwiperOverlay from '../../components/SwiperOverlay';
import TextInputOverlay from '../../components/TextInputOverlay';
import ColorPickerModal from '../../components/ColorPickerModal';
import ThankYouModal from '../../components/ThankYouModal';
import Header from './components/Header';
import Footer from './components/Footer';
import BrushPicker from './components/BrushPicker';
import {getAnimation} from '../../utils/animationUtils';
import styles from '../../themes/styles';
import localStyles from './styles';
import DrawingPen from '../../utils/drawingTools/drawingPen';
import DrawPoint from '../../utils/drawingTools/drawPoint';

import {darkCharcoal, primaryColor} from '../../themes/colors';

class Edit extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    const {uri: bgImage} = idx(route, (_) => _.params.bgImage) || null;

    this.state = {
      bgImage,
      resizeMode: 'cover',
      usedColors: [],
      currentPoints: [],
      previousStrokes: [],
      nextStrokes: [],
      newStroke: [],
      drawingPen: new DrawingPen(),
      selectedTool: null,
      activeAnimation: null,
      deactiveAnimation: null,
      selectedColor: primaryColor,
      strokeWidth: 8,
      isActiveBrush: false,
      isActiveFilter: false,
      isActiveText: false,
      headerAnimation: getAnimation('slideDownHeader'),
      footerAnimation: null,
      sideAnimation: null,
      sidePointAnimation: null,
      showColorPicker: false,
      showThankyouModal: false,
      tempImagePath: null,
      textList: [],
    };
    this.keyboardRef = React.createRef();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt) => this.onUserDrawEvent(evt),
      onPanResponderMove: (evt) => this.onUserDrawEvent(evt),
      onPanResponderRelease: (evt) => this.onUserFinishDrawEvent(evt),
    });
  }

  onUserDrawEvent = (evt) => {
    const {currentPoints, selectedTool} = this.state;
    if (selectedTool === 'pen') {
      let x, y, timestamp;
      [x, y, timestamp] = [
        evt.nativeEvent.locationX,
        evt.nativeEvent.locationY,
        evt.nativeEvent.timestamp,
      ];
      let newPoint = new DrawPoint(x, y, timestamp);
      let newCurrentPoints = currentPoints;
      newCurrentPoints.push(newPoint);
      this.setState({
        currentPoints: newCurrentPoints,
      });
    }
  };

  onUserFinishDrawEvent = () => {
    const {
      drawingPen,
      previousStrokes,
      currentPoints,
      selectedColor,
      selectedTool,
      strokeWidth,
      usedColors,
    } = this.state;
    let newColor;
    if (!usedColors.includes(selectedColor)) {
      newColor = selectedColor;
    }

    if (selectedTool === 'pen') {
      if (currentPoints.length < 1) {
        return;
      }

      let points = currentPoints;
      if (points.length === 1) {
        let p = points[0];
        let distance = Math.sqrt(4) / 2;
        points.push(new DrawPoint(p.x + distance, p.y + distance, p.time));
      }

      let newElement = {
        type: 'Path',
        attributes: {
          d: drawingPen.pointsToSvg(points),
          stroke: selectedColor,
          fill: 'none',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth,
        },
      };

      drawingPen.addNewStroke(points);

      if (newColor) {
        if (usedColors.length >= 12) {
          const newColors = usedColors;
          newColors.pop();
          this.setState({
            usedColors: [newColor, ...newColors],
          });
        } else {
          this.setState({
            usedColors: [newColor, ...usedColors],
          });
        }
      }

      this.setState({
        previousStrokes: [...previousStrokes, newElement],
        currentPoints: [],
        nextStrokes: [],
      });
    }
  };

  _onLayoutContainer = (e) => {
    const {drawingPen} = this.state;
    drawingPen.setOffset(e.nativeEvent.layout);
    this._layout = e.nativeEvent.layout;
  };

  _renderSvgElement = (e, tracker) => {
    if (e.type === 'Path') {
      return <Path {...e.attributes} key={tracker} />;
    }

    return null;
  };

  onBackwardPress = () => {
    const {
      currentPoints,
      previousStrokes,
      nextStrokes,
      drawingPen,
    } = this.state;
    if (currentPoints.length > 0 || previousStrokes.length < 1) {
      return;
    }
    let strokes = previousStrokes;
    let removedElement = strokes.pop();

    drawingPen.backwardStroke();

    this.setState({
      previousStrokes: [...strokes],
      currentPoints: [],
      nextStrokes: [removedElement, ...nextStrokes],
    });
  };

  onForwardPress = () => {
    const {
      currentPoints,
      nextStrokes,
      previousStrokes,
      drawingPen,
    } = this.state;
    if (currentPoints.length > 0 || nextStrokes.length < 1) {
      return;
    }

    let newPreviousStrokes = [];
    let strokes = nextStrokes;
    newPreviousStrokes = [...previousStrokes, strokes[0]];
    strokes.shift();

    drawingPen.addNewStroke(strokes);

    this.setState({
      previousStrokes: newPreviousStrokes,
      currentPoints: [],
      nextStrokes: [...strokes],
    });
  };

  onPressTool = (tool) => {
    if (tool === 'eraser') {
      this.onBrushPickerToggle({toggle: false, tool});
    } else {
      this.onBrushPickerToggle({toggle: true});
    }

    const {selectedTool} = this.state;
    if (!selectedTool) {
      this.setState({
        selectedTool: tool,
        activeAnimation: getAnimation('slideUpTool'),
      });
      return;
    }

    if (selectedTool) {
      this.setState({
        selectedTool: tool,
        activeAnimation: getAnimation('slideUpTool'),
        deactiveAnimation: getAnimation('slideDownTool'),
      });
    }
  };

  onFinishEditing = async () => {
    const {isActiveBrush} = this.state;
    if (isActiveBrush) {
      this.onBrushPress();
    }

    try {
      const res = await this.viewShot.capture();
      this.setState({
        headerAnimation: getAnimation('slideUpHeader'),
        showThankyouModal: true,
        tempImagePath: res,
      });
    } catch (e) {
      console.log(e);
    }
  };

  onBrushPress = () => {
    const {isActiveBrush} = this.state;
    this.setState({
      selectedTool: null,
      isActiveFilter: false,
      isActiveText: false,
      isActiveBrush: !isActiveBrush,
      footerAnimation: isActiveBrush
        ? getAnimation('slideDown')
        : getAnimation('slideUp'),
      sideAnimation: isActiveBrush
        ? getAnimation('slideLeft')
        : getAnimation('slideRight'),
      sidePointAnimation: isActiveBrush
        ? getAnimation('slideLeft')
        : getAnimation('slideRight'),
    });
  };

  onChangeStroke = (strokeWidth) => {
    this.setState({
      strokeWidth,
    });
  };

  onBrushPickerToggle = ({toggle, tool}) => {
    this.setState({
      sideAnimation: !toggle
        ? getAnimation('slideLeft')
        : getAnimation('slideRight'),
      sidePointAnimation: toggle
        ? getAnimation('slideLeft')
        : getAnimation('slideRight'),
    });

    if (tool === 'eraser') {
      this.setState({
        sidePointAnimation: getAnimation('slideLeft'),
      });
    }
  };

  onSharePress = async () => {
    const {navigation} = this.props;
    const {tempImagePath} = this.state;
    try {
      const shareResponse = await Share.open({
        url: tempImagePath,
      });
      if (shareResponse) {
        const {app} = shareResponse;
        if (app === 'com.apple.UIKit.activity.SaveToCameraRoll') {
          this.setState(
            {
              showThankyouModal: false,
            },
            () => {
              navigation.goBack();
            },
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  onFilterPress = () => {
    const {isActiveFilter, isActiveBrush} = this.state;
    if (isActiveBrush) {
      this.onBrushPress();
    }

    this.setState({
      isActiveFilter: !isActiveFilter,
      isActiveText: false,
    });
  };

  onTextPress = () => {
    const {isActiveBrush, isActiveText} = this.state;
    if (isActiveBrush) {
      this.onBrushPress();
    }

    if (this.keyboardRef && this.keyboardRef.current) {
      if (this.keyboardRef.current.isFocused()) {
        this.keyboardRef.current.blur();
      } else {
        this.keyboardRef.current.focus();
      }
    }

    this.setState({
      isActiveFilter: false,
      isActiveText: !isActiveText,
    });
  };

  render() {
    const {route, navigation} = this.props;
    const bgPrimaryColor = idx(route, (_) => _.params.primaryColor) || '#000';
    const {
      resizeMode,
      bgImage,
      previousStrokes,
      drawingPen,
      currentPoints,
      nextStrokes,
      selectedColor,
      selectedTool,
      activeAnimation,
      deactiveAnimation,
      strokeWidth,
      isActiveBrush,
      isActiveFilter,
      isActiveText,
      footerAnimation,
      sideAnimation,
      sidePointAnimation,
      showColorPicker,
      usedColors,
      headerAnimation,
      showThankyouModal,
      tempImagePath,
      textList,
    } = this.state;

    const AllStrokes = previousStrokes.map((stroke, index) => {
      return this._renderSvgElement(stroke, index);
    });

    const imageLocation = Platform.OS === 'ios' ? 'Photos' : 'Gallary';
    const shouldDisabledBackward = previousStrokes.length === 0;
    const shouldDisabledForward = nextStrokes.length === 0;
    const resizeModeStyle = {
      resizeMode,
    };

    return (
      <SafeAreaView style={[styles.container]}>
        <AnimatedComponent
          isWrapper
          customStyle={[
            styles.innerContaier,
            primaryColor && {backgroundColor: bgPrimaryColor},
          ]}
          parentAnimation={getAnimation('fadeIn')}>
          <View style={styles.innerContaier}>
            <AnimatedComponent
              customStyle={localStyles.bgImage}
              index={1}
              childrenAnimation={getAnimation('fadeIn')}>
              <ViewShot
                ref={(c) => {
                  this.viewShot = c;
                }}>
                <ImageBackground
                  source={{uri: bgImage}}
                  style={[localStyles.bgImage]}
                  imageStyle={[
                    resizeModeStyle,
                    bgPrimaryColor && {
                      backgroundColor: bgPrimaryColor,
                    },
                  ]}>
                  <View
                    {...this.panResponder.panHandlers}
                    onLayout={this._onLayoutContainer}>
                    <Svg width="100%" height="100%">
                      <G>
                        {AllStrokes}
                        {selectedTool === 'pen' && (
                          <Path
                            key={previousStrokes.length}
                            d={drawingPen.pointsToSvg(currentPoints)}
                            stroke={selectedColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                      </G>
                    </Svg>
                  </View>
                </ImageBackground>
                <SwiperOverlay
                  isActiveFilter={isActiveFilter}
                  pointerEvents={isActiveFilter ? 'auto' : 'none'}
                />
                <TextInputOverlay
                  pointerEvents={isActiveText ? 'auto' : 'none'}
                  isActiveText={isActiveText}
                  forwardedRef={this.keyboardRef}
                  onActiveTextInput={() => {
                    this.setState({
                      isActiveText: true,
                    });
                  }}
                  onDeactiveTextInput={() => {
                    this.setState({
                      isActiveText: false,
                    });
                  }}
                  onChangeTextList={(text) => {
                    if (text.length) {
                      this.setState({
                        textList: [...textList, text.trim()],
                      });
                    }
                  }}
                />
              </ViewShot>
            </AnimatedComponent>
            <AnimatedComponent
              index={2}
              customStyle={localStyles.topHeader}
              animationDelay={1000}
              childrenAnimation={headerAnimation}>
              <Header
                resizeMode={resizeMode}
                isActiveBrush={isActiveBrush}
                isActiveFilter={isActiveFilter}
                isActiveText={isActiveText}
                onTextPress={() => this.onTextPress()}
                onBackwardPress={() => this.onBackwardPress()}
                onForwardPress={() => this.onForwardPress()}
                shouldDisabledBackward={shouldDisabledBackward}
                shouldDisabledForward={shouldDisabledForward}
                onDeletePress={() => {
                  navigation.goBack();
                }}
                onFitToScreenPress={() => {
                  if (resizeMode === 'contain') {
                    this.setState({resizeMode: 'cover'});
                  } else {
                    this.setState({resizeMode: 'contain'});
                  }
                }}
                onDonePress={() => this.onFinishEditing()}
                onBrushPress={() => this.onBrushPress()}
                onFilterPress={() => this.onFilterPress()}
                childrenAnimation={getAnimation('fadeIn')}
              />
            </AnimatedComponent>
            <AnimatedComponent
              index={2}
              delayValue={0}
              duration={100}
              customStyle={localStyles.bottomHeader}
              childrenAnimation={footerAnimation}>
              <Footer
                selectedTool={selectedTool}
                selectedColor={selectedColor}
                activeAnimation={activeAnimation}
                deactiveAnimation={deactiveAnimation}
                onPressPen={() => this.onPressTool('pen')}
                onPressEraser={() => this.onPressTool('eraser')}
              />
            </AnimatedComponent>
            <AnimatedComponent
              index={2}
              delayValue={0}
              duration={100}
              customStyle={localStyles.sideHeader}
              childrenAnimation={sideAnimation}>
              <>
                <BrushPicker
                  selectedColor={selectedColor}
                  selectedStroke={strokeWidth}
                  onChangeStroke={(newStrokeWidth) =>
                    this.onChangeStroke(newStrokeWidth)
                  }
                  onBrushPickerToggle={({toggle}) => {
                    this.onBrushPickerToggle({toggle});
                  }}
                  onChangeColor={() => {
                    this.setState({
                      showColorPicker: true,
                    });
                  }}
                />
              </>
            </AnimatedComponent>
            <AnimatedComponent
              index={2}
              delayValue={0}
              duration={100}
              customStyle={localStyles.sideHeaderPoint}
              childrenAnimation={sidePointAnimation}>
              <Pressable
                style={localStyles.sidePointButton}
                onPress={() =>
                  this.onBrushPickerToggle({toggle: true, fromPicker: true})
                }>
                <Icon
                  size={15}
                  color={darkCharcoal}
                  name="caret-forward-outline"
                />
              </Pressable>
            </AnimatedComponent>
            <ColorPickerModal
              showColorPicker={showColorPicker}
              usedColors={usedColors}
              selectedColor={selectedColor}
              onCloseModal={() => {
                this.setState({showColorPicker: false});
              }}
              onColorChange={(color) => {
                this.setState({
                  selectedColor: color,
                });
              }}
              onPressRecentColor={(item) =>
                this.setState({
                  showColorPicker: false,
                  selectedColor: item,
                })
              }
            />
            <ThankYouModal
              showThankyouModal={showThankyouModal}
              onDonePress={() => {
                this.setState(
                  {
                    showThankyouModal: false,
                  },
                  () => {
                    navigation.goBack();
                  },
                );
              }}
              onSavePress={() => {
                if (tempImagePath) {
                  CameraRoll.save(tempImagePath);
                  Toast.show(`Saved to ${imageLocation}`);
                }
              }}
              onSharePress={() => {
                this.onSharePress();
              }}
            />
          </View>
        </AnimatedComponent>
      </SafeAreaView>
    );
  }
}

export default Edit;
