<Content padder>
    <Card>
        <CardItem>
            <Left>
                <Thumbnail source={require('../images/logo.png')} />
                <Body>
                    <Text>NativeBase</Text>
                    <Text>ASSeekkkkk</Text>
                </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
            <Image source={require('../images/logo.png')} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
    </Card>
    <Text>
        Hello Biodata
    </Text>
    <Text>
        id: {this.state.auth.id}{'\n'}
        id ibu: {this.state.auth.id_ibu}{'\n'}
        api_token: {this.state.auth.api_token}
    </Text>
    <Text>------------------</Text>
    <Text>
        nama ibu: {this.state.getBio.nama_ibu}{'\n'}
        nama suami: {this.state.getBio.nama_suami}{'\n'}
        Test: Coba
    </Text>
</Content>



<Calendar style={{height: null, width: null, flex: 1}}
    // Collection of dates that have to be marked. Default = {}
    markedDates={{
        '2018-12-14': {  
            periods: [
                { startingDay: false, endingDay: true, color: '#5f9ea0' },
                { startingDay: false, endingDay: true, color: '#ffa500' },
                { startingDay: true, endingDay: false, color: '#f0e68c' },
            ]
        },
        '2018-12-15': {  
            periods: [  
                { startingDay: true, endingDay: false, color: '#ffa500' },
                { color: 'transparent' },
                { startingDay: false, endingDay: false, color: '#f0e68c' },
            ]
        },
    }} 
    markingType='multi-period' 
    theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#000000',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#1223b8',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        monthTextColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textMonthFontWeight: 'bold',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
    }}
/>


<View style={{flex: 1}}>
                    <View style={{height: 150}} />
                    <View style={{flex: 1, backgroundColor: 'powderblue'}}>
                        <ScrollView>
                            <Separator bordered>
                                <Text>Biodata Ibu</Text>
                            </Separator>
                            <ListItem>
                                <Text style={styles.label}>Nama</Text>
                                <Text style={styles.data} note></Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Nama Suami</Text>
                                <Text style={styles.data} note></Text>
                            </ListItem>
                            <Separator bordered>
                                <Text>Biodata Anak</Text>
                            </Separator>
                            <ListItem>
                                <Text>Caroline Aaron</Text>
                            </ListItem>
                            <ListItem last>
                                <Text>Lee Allen</Text>
                            </ListItem>
                        </ScrollView>
                    </View>
                </View>


<Card>
    <CardItem>
        <Text>
            id: {this.state.auth.id}{'\n'}
            id ibu: {this.state.auth.id_ibu}{'\n'}
            api_token: {this.state.auth.api_token}
        </Text>
    </CardItem>
</Card>

<Header transparent style={{backgroundColor: 'steelblue'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>


<View style={{ flex: 1, flexDirection:'row' }}>
                        <View style={{height: 50, backgroundColor: 'powderblue'}}>
                            <Thumbnail source={require('../images/logo.png')} />
                        </View>
                        <View style={{height: 50, backgroundColor: 'skyblue'}}>
                            <Text>Hamzah</Text>
                        </View>
                        <View style={{height: 50, backgroundColor: 'steelblue'}}>
                            <Button iconLeft primary onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: CANCEL_INDEX,
                                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title: "Testing ActionSheet"
                                    },
                                    buttonIndex => {
                                        this.setState({ clicked: BUTTONS[buttonIndex] });
                                    }
                                )}
                            >
                                <Ionicons name="md-book" size={20} color="red" />
                                <Text>Coba</Text>
                            </Button>
                        </View>
                    </View>

<Grid style={{backgroundColor: '#E4F1F6'}}>
                            <Col style={{ backgroundColor: '#635DB7'}}>
                                <Text>A</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#00CE9F'}}>
                                <Text>{item.berat_badan} Kg</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#635DB7'}}>
                                <Text>{item.tinggi_badan} cm</Text>
                            </Col>
                            <Col style={{ backgroundColor: '#00CE9F'}}>
                                <Text>A</Text>
                            </Col>
                        </Grid>


<List>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail small square source={require('../images/icon/child.png')} />
                                        </Left>
                                        <Body>
                                            <Text>{item.nama_anak}</Text>
                                            <Text note>Usia {item.umur} Bulan</Text>
                                        </Body>
                                        <Right></Right>
                                    </ListItem>
                                    <ListItem>
                                        <Left>
                                            <Text style={{color: 'gray'}}>{item.tgl_timbang}</Text>
                                        </Left>
                                        <Right>
                                            <Button transparent onPress={this.DetailTbg.bind(
                                                this, 
                                                item.id_anak
                                            )}>
                                                <Text>History</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Text style={{fontSize:7, color: '#E4F1F6'}}>{item.tgl_timbang}</Text>
                                        </Left>
                                        <Body>
                                            <Text>Berat Badan</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent dark>
                                                <Text>{item.berat_badan} Kg</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                    <ListItem thumbnail>
                                        <Left>
                                            <Text style={{fontSize:7, color: '#E4F1F6'}}>{item.tgl_timbang}</Text>
                                        </Left>
                                        <Body>
                                            <Text>Tinggi Badan</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent dark>
                                                <Text>{item.tinggi_badan} cm</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                </List>


<View style={{flex:1, paddingTop:1}}>
                        <View style={{flex: 1, height:50, flexDirection: 'row', backgroundColor:'white'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                                <Thumbnail small square source={require('../images/icon/child.png')} />
                            </View>
                            <View style={{flex:3, justifyContent: 'center'}}>
                                <Text>AAA</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                                <Text>Usia 999 Bulan</Text>
                            </View>
                        </View>

                        <View style={{flex:1, paddingTop:3}}>
                            <View style={{flex: 1,flexDirection: 'row', backgroundColor:'white',marginTop:1, height:50}}>
                                <View style={{flex:1, justifyContent:'center', backgroundColor:'grey'}}>
                                    <Text style={{fontSize:12}}>0 Bulan</Text>
                                </View>
                                <FontAwesome name="check" color='red' style={{position: 'absolute', right:0, top:9, bottom:0, left:105, zIndex:5}} size={24} />
                                <View style={{flex:2, paddingLeft:10, backgroundColor:'white'}}>
                                    <Text>SSS</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1, paddingTop:3}}>
                            <View style={{flex: 1,flexDirection: 'row', backgroundColor:'white',marginTop:1, height:50}}>
                                <View style={{flex:1, justifyContent:'center', backgroundColor:'grey'}}>
                                </View>
                                <View style={{borderLeftColor: 'black',borderLeftWidth: 1,}}></View>
                                <View style={{flex:2, paddingLeft:10, backgroundColor:'white'}}>
                                    <Text>SSS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, paddingTop:3}}>
                            <View style={{flex: 1,flexDirection: 'row', backgroundColor:'white',marginTop:1, height:50}}>
                                <View style={{flex:1, justifyContent:'center', backgroundColor:'grey'}}>
                                </View>
                                <View style={{borderLeftColor: 'black',borderLeftWidth: 1,}}></View>
                                <View style={{flex:2, paddingLeft:10, backgroundColor:'white'}}>
                                    <Text>SSS</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, paddingTop:3}}>
                            <View style={{flex: 1,flexDirection: 'row', backgroundColor:'white',marginTop:1, height:50}}>
                                <View style={{flex:1, justifyContent:'center',backgroundColor:'grey'}}>
                                    <Text style={{fontSize:12}}>1 Bulan</Text>
                                </View>
                                <View style={{borderLeftColor: 'black',borderLeftWidth: 1,}}></View>
                                <View style={{flex:2, paddingLeft:10, backgroundColor:'white'}}>
                                    <Text>SSS</Text>
                                </View>
                            </View>
                        </View>
                    </View>


<View style={{height:150, backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('./images/logo.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
        </View>


renderFooter(){
        if(this.state.isLoading == false && this.state.isError == true) {
            return (
                <View>
                    <TouchableOpacity 
                        style={{
                            borderWidth:1,
                            borderColor:'rgba(0,0,0,0.2)',
                            alignItems:'center',
                            justifyContent:'center',
                            width:50,
                            height:50,
                            backgroundColor:'#fff',
                            borderRadius:100,
                        }}
                    >
                        <MaterialCommunityIcons name="reload" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <View style={{
                paddingVertical: 5,
            }}>
                <Spinner color='black' />
            </View>
        );
    }