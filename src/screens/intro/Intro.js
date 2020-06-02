import React, { useState, useRef } from 'react';
import { StyleSheet, Image, View, Dimensions, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Container, Header, Content, Button, Left, Right, Body, Text } from 'native-base';
import plateformSpecific from '../../utils/plateformSpecific';
const Intro = () => {
    let winWidth = Dimensions.get('window').width;
    let winHeight = Dimensions.get('window').height;

    const carouselRef = useRef(null);
    const [state, setState] = useState({
        activeSlide: 0,
        carouselItems: [
            {
                slider: require('../../assets/IntroScreen/pic1.png'),
                text: 'Order and get your favourite products from anywhere'
            },
            {
                slider: require('../../assets/IntroScreen/pic2.png'),
                text: 'Jovan delivers your  products safely at your door stop'

            },
            {
                slider: require('../../assets/IntroScreen/pic3.png'),
                text: 'Track your jovi rider'


            },
        ]
    });
    const { carouselItems, activeSlide } = state;


    const _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 'auto' }}>
                <View style={{ width: winWidth }}>
                    <Image resizeMode="contain" source={item.slider} style={{ alignSelf: 'center', flex: 1, height: 400, width: 400, backgroundColor: 'transparent' }} />
                </View>
                <View style={{ marginTop: 10, alignSelf: 'center', width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'proxima-nova', fontStyle: 'italic', color: '#3E3E3E', lineHeight: 30, alignSelf: 'center', textAlign: 'center' }}>{item.text}</Text>
                </View>
            </View>
        )
    }

    const _pagination = () => {
        return (
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeSlide}
                carouselRef={carouselRef}
                tappableDots={true}
                containerStyle={{ backgroundColor: 'transparent', marginTop: 40 }}
                dotStyle={{
                    width: 12,
                    height: 12,
                    borderRadius: 5,
                    marginHorizontal: 6,
                    backgroundColor: '#7359BE'
                }}
                inactiveDotStyle={{
                    width: 13,
                    height: 13,
                    backgroundColor: '#333333'
                }}
                inactiveDotOpacity={0.8}
                inactiveDotScale={0.8}
            />
        );
    }
    const _onSnapToItemHandler = (index) => {
        setState(prevState => ({ ...prevState, activeSlide: index }));
    }
    return (
        <Container>
            <ImageBackground source={require('../../assets/IntroScreen/doodle.png')} style={{ height: winHeight, width: winWidth }}>
                <Header transparent>
                    <Left />
                    <Body />
                    <Right>
                        <Button transparent>
                            <Text style={{ color: '#7359BE', fontWeight:'100', fontStyle: 'normal',  fontFamily: 'proxima-nova' }}>Skip</Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ flex: 1 }}>
                    <Carousel
                        ref={carouselRef}
                        data={carouselItems}
                        sliderWidth={winWidth}
                        itemWidth={winWidth}
                        renderItem={_renderItem}
                        onSnapToItem={index => _onSnapToItemHandler(index)}
                        autoplay={true}
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        autoplayDelay={1000}
                        autoplayInterval={4000}
                        activeAnimationType="spring"
                        loop={true}
                    >
                    </Carousel>
                </Content>
                <View style={{ flex: 1, position: 'absolute', justifyContent: 'flex-end', flexDirection: 'column', height: winHeight - 50, alignSelf: 'center' }}>
                    {_pagination()}
                </View>
            </ImageBackground>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Intro;
