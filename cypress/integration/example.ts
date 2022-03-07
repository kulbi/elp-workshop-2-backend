describe('#GET current_weather', () => {
  it('should return valid datatypes from Open Weather Map API', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request(
      'GET',
      `http://localhost:3001/current_weather?lat=52.237049&lon=21.017532&alternateSource=false`,
    );

    //then
    request.should((response) => {
      expect(response.body.temperature).to.be.a('number');
      expect(response.body.pressure).to.be.a('number');
      expect(response.body.humidity).to.be.a('number');
      expect(response.body.source).to.be.a('string');
    });
  });

  it('should return valid datatypes from Dark Sky API', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request(
      'GET',
      `http://localhost:3001/current_weather?lat=52.237049&lon=21.017532&alternateSource=true`,
    );

    //then
    request.should((response) => {
      expect(response.body.temperature).to.be.a('number');
      expect(response.body.pressure).to.be.a('number');
      expect(response.body.humidity).to.be.a('number');
      expect(response.body.source).to.be.a('string');
    });
  });

  it('should return 400 if longitude not provided', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?lat=52.237049&alternateSource=true`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('lon parameter is required');
    });
  });

  it('should return 400 if latitude not provided', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?&lon=21.017532&alternateSource=true`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('lat parameter is required');
    });
  });

  it('should return 400 alternateSource not provided', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?lat=52.237049&lon=21.017532`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq(
        'alternateSource parameter is required',
      );
    });
  });

  it('should return 400 if longitude out of range', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?lat=52.237049&lon=420&alternateSource=true`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('longitude out of range');
    });
  });

  it('should return 400 if latitude out of range', () => {
    // given
    apiIsAvailable();

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?lat=420&lon=21.017532&alternateSource=true`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('latitude out of range');
    });
  });
});

function apiIsAvailable() {}
