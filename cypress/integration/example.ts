describe('#GET example', () => {
  it('returns example object', () => {
    // given
    apiIsAvailable();

    //when
    const request = getExample();

    //then
    resultIs(request, { example: false });
  });
});

describe('#GET current_weather', () => {
  it('should return valid data', () => {
    // given

    //when
    const request = cy.request(
      'GET',
      `http://localhost:3001/current_weather?lat=51&lon=41`,
    );

    //then
    request.should((response) => {
      expect(response.body.temperature).to.be.a('number');
      expect(response.body.pressure).to.be.a('number');
      expect(response.body.humidity).to.be.a('number');
    });
  });

  it('should return 400 if lon/lat not provided', () => {
    // given

    //when
    const request = cy.request({
      method: 'GET',
      url: `http://localhost:3001/current_weather?lat=51`,
      failOnStatusCode: false,
    });

    //then
    request.should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('lon is required');
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
