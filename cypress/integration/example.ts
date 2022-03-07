describe('#GET example', () => {
  it('returns example object', () => {
    // given
    apiIsAvailable();

    //when
    const request = getExample();

    //then
    resultIs(request, { example: true });
  });
});

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

function givenWeatherApiRespondsWith(body: any) {
  cy.intercept(
    'GET',
    'https://community-open-weather-map.p.rapidapi.com/weather',
    {
      statusCode: 201,
      body: body,
    },
  );
}

function apiIsAvailable() {}

function getExample(): Cypress.Chainable<Cypress.Response<any>> {
  return cy.request('GET', `http://localhost:3001/example`);
}

async function resultIs(
  request: Cypress.Chainable<Cypress.Response<any>>,
  result: any,
) {
  request.should((response) => {
    cy.log(response.body, 'body');
    cy.log(result, 'result');
    expect(response.body).to.eql(result);
  });
}
