import React, { Component } from "react";
import { Animated, Easing } from "react-native";
import { Svg, Circle } from "react-native-svg";

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

interface Props {
  color: string;
}

export class Loader extends Component<Props> {
  private rotate = new Animated.Value(0);
  private handle?: Animated.CompositeAnimation;

  static defaultProps = {
    color: "#fff",
  };

  override componentDidMount() {
    this.animate();
  }

  override shouldComponentUpdate({ color }: Props) {
    return color !== this.props.color;
  }

  override componentWillUnmount() {
    if (this.handle) {
      this.handle.stop();
      this.handle.reset();
      this.handle = undefined;
    }
  }

  private animate() {
    this.handle = Animated.loop(
      Animated.timing(this.rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    this.handle.start();
  }

  render() {
    return (
      <AnimatedSVG
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        style={{
          transform: [
            {
              rotate: this.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
                extrapolateRight: "extend",
              }),
            },
          ],
        }}>
        <Circle
          cx="50"
          cy="50"
          r="43"
          strokeWidth="8"
          stroke="#fff"
          strokeDasharray="67.54424205218055 67.54424205218055"
          fill="none"
          strokeLinecap="round"
          transform="matrix(1,0,0,1,0,0)"
        />
      </AnimatedSVG>
    );
  }
}
