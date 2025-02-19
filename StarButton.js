// React and react native imports
import React, { Component } from "react";
import { Image, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";

// Third party imports
import Button from "react-native-button";
import EntypoIcons from "react-native-vector-icons/Entypo";
import EvilIconsIcons from "react-native-vector-icons/EvilIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icons from "react-native-vector-icons/FontAwesome5";
import FoundationIcons from "react-native-vector-icons/Foundation";
import IoniconsIcons from "react-native-vector-icons/Ionicons";
import MaterialIconsIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcons from "react-native-vector-icons/MaterialCommunityIcons";
import OcticonsIcons from "react-native-vector-icons/Octicons";
import ZocialIcons from "react-native-vector-icons/Zocial";
import SimpleLineIconsIcons from "react-native-vector-icons/SimpleLineIcons";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  Feather: FeatherIcons,
  FontAwesome: FontAwesomeIcons,
  FontAwesome5: FontAwesome5Icons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  MaterialCommunityIcons: MaterialCommunityIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons,
  SimpleLineIcons: SimpleLineIconsIcons,
  Fontisto: FontistoIcons,
  AntDesign: AntDesignIcons,
};

const propTypes = {
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool.isRequired,
  halfStarEnabled: PropTypes.bool.isRequired,
  icoMoonJson: PropTypes.string,
  iconSet: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reversed: PropTypes.bool.isRequired,
  starColor: PropTypes.string.isRequired,
  starIconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  starSize: PropTypes.number.isRequired,
  activeOpacity: PropTypes.number.isRequired,
  starStyle: ViewPropTypes.style,
  iconSolid: PropTypes.bool,
  onStarButtonPress: PropTypes.func.isRequired,
  textLabel: PropTypes.string,
  textLabelStyle: ViewPropTypes.style,
};

const defaultProps = {
  buttonStyle: {},
  icoMoonJson: undefined,
  starStyle: {},
  iconSolid: false,
  textLabel: undefined,
  textLabelStyle: {},
};

class StarButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress(event) {
    const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }

  iconSetFromProps() {
    const { icoMoonJson, iconSet } = this.props;
    if (icoMoonJson) {
      return createIconSetFromIcoMoon(icoMoonJson);
    }

    return iconSets[iconSet];
  }

  renderIcon() {
    const {
      reversed,
      starColor,
      starIconName,
      starSize,
      starStyle,
      iconSolid,
      textLabel,
      textLabelStyle,
    } = this.props;

    const Icon = this.iconSetFromProps();
    let iconElement;

    const newStarStyle = {
      transform: [
        {
          scaleX: reversed ? -1 : 1,
        },
      ],
      ...StyleSheet.flatten(starStyle),
    };

    if (typeof starIconName === "string") {
      iconElement = (
        <Icon
          name={starIconName}
          size={starSize}
          color={starColor}
          style={newStarStyle}
          solid={iconSolid}
        />
      );
    } else {
      const imageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: "contain",
      };

      const iconStyles = [imageStyle, newStarStyle];

      iconElement = <Image source={starIconName} style={iconStyles} />;
    }

    return iconElement;
  }

  render() {
    const { activeOpacity, buttonStyle, disabled, textLabel, textLabelStyle } = this.props;

    return (
      <Button
        activeOpacity={activeOpacity}
        disabled={disabled}
        containerStyle={buttonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
        {textLabel ? (
          <Text style={textLabelStyle}>{textLabel}</Text>
        ) : null}
      </Button>
    );
  }
}

StarButton.propTypes = propTypes;
StarButton.defaultProps = defaultProps;

export default StarButton;
