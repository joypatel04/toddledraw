import React, {Component} from 'react';
import {View, PanResponder} from 'react-native';
import idx from 'idx';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path, Image, G} from 'react-native-svg';

import AnimatedComponent from '../../components/AnimatedComponent';
import TopHeader from './components/TopHeader';
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
      resizeMode: 'slice',
      bgImage,
      currentPoints: [],
      previousStrokes: [],
      nextStrokes: [],
      newStroke: [],
      drawingPen: new DrawingPen(),
    };

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt) => this.onUserDrawEvent(evt),
      onPanResponderMove: (evt) => this.onUserDrawEvent(evt),
      onPanResponderRelease: (evt) => this.onUserFinishDrawEvent(evt),
    });
  }

  onUserDrawEvent = (evt) => {
    const {previousStrokes, currentPoints} = this.state;
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
      previousStrokes: previousStrokes,
      currentPoints: newCurrentPoints,
    });
  };

  onUserFinishDrawEvent = () => {
    const {drawingPen, previousStrokes, currentPoints} = this.state;
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
        stroke: '#000000',
        strokeWidth: 4,
        fill: 'none',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    };

    drawingPen.addNewStroke(points);

    this.setState({
      previousStrokes: [...previousStrokes, newElement],
      currentPoints: [],
      nextStrokes: [],
    });
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
    console.log('nextStrokes', JSON.stringify(nextStrokes));
    let strokes = nextStrokes;
    if (nextStrokes.length > 1) {
      newPreviousStrokes = [...previousStrokes, strokes[0]];
    } else {
      newPreviousStrokes = [...previousStrokes, strokes[0]];
    }

    strokes.shift();

    console.log('strokes', strokes);

    drawingPen.addNewStroke(strokes);

    this.setState({
      previousStrokes: newPreviousStrokes,
      currentPoints: [],
      nextStrokes: [...strokes],
    });
  };

  render() {
    const {route, navigation} = this.props;
    const primaryColor = idx(route, (_) => _.params.primaryColor) || '#fff';
    const {
      resizeMode,
      bgImage,
      previousStrokes,
      drawingPen,
      currentPoints,
      nextStrokes,
    } = this.state;

    const AllStrokes = previousStrokes.map((stroke, index) => {
      return this._renderSvgElement(stroke, index);
    });

    const shouldDisabledBackward = previousStrokes.length === 0;
    const shouldDisabledForward = nextStrokes.length === 0;

    return (
      <SafeAreaView
        style={[
          styles.container,
          primaryColor && {backgroundColor: primaryColor},
        ]}>
        <AnimatedComponent
          isWrapper
          customStyle={[
            styles.innerContaier,
            primaryColor && {backgroundColor: primaryColor},
          ]}
          parentAnimation={getAnimation('fadeIn')}>
          <View style={styles.innerContaier}>
            <AnimatedComponent
              index={2}
              customStyle={localStyles.topHeader}
              childrenAnimation={getAnimation('slideDownWithFadeIn')}>
              <TopHeader
                resizeMode={resizeMode}
                onBackwardPress={() => this.onBackwardPress()}
                onForwardPress={() => this.onForwardPress()}
                shouldDisabledBackward={shouldDisabledBackward}
                shouldDisabledForward={shouldDisabledForward}
                onDeletePress={() => {
                  navigation.goBack();
                }}
                onFitToScreenPress={() => {
                  if (resizeMode === 'slice') {
                    this.setState({resizeMode: 'meet'});
                  } else {
                    this.setState({resizeMode: ' slice'});
                  }
                }}
              />
            </AnimatedComponent>
            <AnimatedComponent
              customStyle={localStyles.bgImage}
              index={1}
              childrenAnimation={getAnimation('fadeIn')}>
              <View
                {...this.panResponder.panHandlers}
                onLayout={this._onLayoutContainer}>
                <Svg
                  width="100%"
                  height="100%"
                  fill="blue"
                  stroke="red"
                  color="green">
                  <Image
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    preserveAspectRatio={`xMidYMid ${resizeMode}`}
                    opacity="1"
                    href={{uri: bgImage}}
                    clipPath="url(#clip)"
                  />
                  <G>
                    {AllStrokes}
                    <Path
                      key={previousStrokes.length}
                      d={drawingPen.pointsToSvg(currentPoints)}
                      stroke={'#000000'}
                      strokeWidth={4}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </G>
                </Svg>
              </View>
            </AnimatedComponent>
            <AnimatedComponent
              index={3}
              customStyle={localStyles.bottomHeader}
              childrenAnimation={getAnimation('slideUpWithFadeIn')}
            />
          </View>
        </AnimatedComponent>
      </SafeAreaView>
    );
  }
}

export default Edit;
