import React, {Component} from 'react';
import {View, PanResponder, ImageBackground} from 'react-native';
import idx from 'idx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path, G} from 'react-native-svg';
import ViewShot from 'react-native-view-shot';

import AnimatedComponent from '../../components/AnimatedComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import BrushPicker from './components/BrushPicker';
import {getAnimation} from '../../utils/animationUtils';
import styles from '../../themes/styles';
import localStyles from './styles';
import DrawingPen from '../../utils/drawingTools/drawingPen';
import DrawPoint from '../../utils/drawingTools/drawPoint';

class Edit extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    const {uri: bgImage} = idx(route, (_) => _.params.bgImage) || null;

    this.state = {
      resizeMode: 'cover',
      bgImage,
      currentPoints: [],
      previousStrokes: [],
      nextStrokes: [],
      newStroke: [],
      drawingPen: new DrawingPen(),
      selectedTool: null,
      activeAnimation: null,
      deactiveAnimation: null,
      selectedColor: 'red',
      strokeWidth: 8,
      isActiveBrush: false,
      footerAnimation: null,
      footerChildrenAnimation: null,
      sideAnimation: null,
      sideChildrenAnimation: null,
    };

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
    } = this.state;
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
    console.log('e', e, 'tracker', tracker);
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
    try {
      const res = await this.viewShot.capture();
      console.log('res', res);
    } catch (e) {
      console.log(e);
    }
  };

  onBrushPress = () => {
    const {isActiveBrush} = this.state;
    this.setState({
      selectedTool: null,
      isActiveBrush: !isActiveBrush,
      footerAnimation: isActiveBrush
        ? getAnimation('slideDown')
        : getAnimation('slideUp'),
      footerChildrenAnimation: isActiveBrush
        ? getAnimation('fadeOut')
        : getAnimation('fadeIn'),
      sideAnimation: isActiveBrush
        ? getAnimation('slideLeft')
        : getAnimation('slideRight'),
      siddeChildrenAnimation: isActiveBrush
        ? getAnimation('fadeOut')
        : getAnimation('fadeIn'),
    });
  };

  onChangeStroke = (strokeWidth) => {
    this.setState({
      strokeWidth,
    });
  };

  render() {
    const {route, navigation} = this.props;
    const primaryColor = idx(route, (_) => _.params.primaryColor) || '#000';
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
      footerAnimation,
      footerChildrenAnimation,
      sideAnimation,
      sideChildrenAnimation,
    } = this.state;

    const AllStrokes = previousStrokes.map((stroke, index) => {
      return this._renderSvgElement(stroke, index);
    });

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
            primaryColor && {backgroundColor: primaryColor},
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
                  imageStyle={resizeModeStyle}>
                  <View
                    {...this.panResponder.panHandlers}
                    onLayout={this._onLayoutContainer}>
                    <Svg width="100%" height="100%">
                      <G>
                        {AllStrokes}
                        <Path
                          key={previousStrokes.length}
                          d={drawingPen.pointsToSvg(currentPoints)}
                          stroke={selectedColor}
                          strokeWidth={strokeWidth}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </G>
                    </Svg>
                  </View>
                </ImageBackground>
              </ViewShot>
            </AnimatedComponent>
            <AnimatedComponent
              index={2}
              customStyle={localStyles.topHeader}
              animationDelay={1000}
              childrenAnimation={getAnimation('slideDownHeader')}>
              <Header
                resizeMode={resizeMode}
                isActiveBrush={isActiveBrush}
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
                childrenAnimation={footerChildrenAnimation}
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
              <BrushPicker
                selectedColor={selectedColor}
                selectedStroke={strokeWidth}
                childrenAnimation={sideChildrenAnimation}
                onChangeStroke={(newStrokeWidth) =>
                  this.onChangeStroke(newStrokeWidth)
                }
              />
            </AnimatedComponent>
          </View>
        </AnimatedComponent>
      </SafeAreaView>
    );
  }
}

export default Edit;
