import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import { Thumbnail, Header, Left, Right, Body, Container, Content, Button, Form, Item, Input, Label, Icon, Title, List, ListItem} from 'native-base';

//import Svg, {Rect, Text} from 'react-native-svg';
import { Svg } from 'expo';
const { Rect, Text, Image } = Svg;


export class PitchMeter extends React.Component {
    constructor(props) {
        super(props);
    }
    
    getUserAvatar(username) {
        let avatar;
        this.props.users.map( (user) => {
            if(user.username === username) {
                avatar = user.avatar;
            }
        });
        console.log(avatar);
        return avatar;
    }
    
    
    render() {
        let svg_key=0;
        let totalFunded=0;
        const pitchGoal = this.props.goal;
        const pitchFundedAmount = this.props.funded;
        const meterLeftPadding = 50;
        const meterWidth = 60;
        const meterTopPadding = 10;
        const meterHeight = 200;
        const meterFillHeight = pitchFundedAmount/pitchGoal;
        return (
            <Svg key={svg_key++} style={{marginTop:0,paddingTop:0}} height={300} width={200} >
              <Rect
                x={meterLeftPadding}
                y={meterTopPadding}
                width={meterWidth}
                height={meterHeight}
                stroke='#c2c2c2'
                strokeWidth='0.5'
                fill='#f5f5f5'
              />
              <Rect
                x={meterLeftPadding}
                y={meterTopPadding+(1-meterFillHeight)*meterHeight}
                width={meterWidth}
                height={meterFillHeight*meterHeight}
                stroke='#c2c2c2'
                strokeWidth='0.5'
                fill='#dd2c00'
              />
              <Text
                fill="black"
                fontSize="15"
                x={meterLeftPadding+meterWidth/2}
                y={meterTopPadding-5+meterHeight-meterFillHeight*meterHeight}
                textAnchor='middle'>
                {'$'+pitchFundedAmount.toString()}
              </Text>
              <Text
                fill="black"
                fontSize="15"
                x={meterLeftPadding-35}
                y={meterTopPadding+7}>
                {'$'+pitchGoal.toString()}
              </Text>
              <Text
                fill="black"
                fontSize="15"
                x={meterLeftPadding-35}
                y={meterTopPadding+7+meterHeight/2}>
                ${(pitchGoal/2).toString()}
              </Text>
              <Text
                fill="black"
                fontSize="15"
                x={meterLeftPadding-20}
                y={meterTopPadding+7+meterHeight}>
                $0
              </Text>
              {Object.keys(this.props.userRequests).map((username, index) => {
                totalFunded += this.props.userRequests[username][1];
                return ([
                  <Image
                    key={username+'-image'}
                    width={20}
                    height={20}
                    x={meterLeftPadding+meterWidth+2}
                    y={meterTopPadding+7+meterHeight*(1-totalFunded/pitchGoal)-10}
                    href={{uri:this.getUserAvatar(username)}}
                  />,
                  <Text
                  key={username+'-text'}
                    fill='black'
                    fontSize='13'
                    x={meterLeftPadding+meterWidth+22}
                    y={meterTopPadding+7+meterHeight*(1-totalFunded/pitchGoal)}
                  >
                  {username}
                  </Text>
                ])
              })}
            </Svg>
        )
    }
}
/*              <Svg.Text
                fill='black'
                stroke='black'
                fontSize='15'
                textAnchor='right'
                x={meterLeftPadding+meterWidth}
                y={meterTopPadding}
              >$300</Svg.Text>
              */

const styles = StyleSheet.create({
});


