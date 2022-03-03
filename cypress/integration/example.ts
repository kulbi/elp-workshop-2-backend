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

function apiIsAvailable() {}

function getExample(): Cypress.Chainable<Cypress.Response<any>> {
  return cy.request('GET', `http://localhost:3001/example`);
}

async function resultIs(
  request: Cypress.Chainable<Cypress.Response<any>>,
  result: { example: boolean },
) {
  request.should((response) => {
    expect(response.body).to.eql(result);
  });
}
