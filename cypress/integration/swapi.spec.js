/// <reference types="Cypress" />

context("Star Wars API Test Suite", () => {
  let secondMovieUrl;
  let firstPlanetUrl;

  it("should contain C3PO information", () => {
    cy.request({
      method: "GET",
      url: "/people/2"
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property("skin_color", "gold")
      expect(response.body.films).to.have.length(6)

      secondMovieUrl = response.body.films[1]
    })
  })

  it("should contains C3PO's second movie information", () => {
    cy.request({
      method: "GET",
      url: secondMovieUrl
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.release_date).to.match(/^\d{4}-\d{2}-\d{2}$/)
      expect(response.body.characters.length).to.be.greaterThan(0)
      expect(response.body.planets.length).to.be.greaterThan(0)
      expect(response.body.starships.length).to.be.greaterThan(0)
      expect(response.body.vehicles.length).to.be.greaterThan(0)
      expect(response.body.species.length).to.be.greaterThan(0)

      firstPlanetUrl = response.body.planets[0]
    })
  });

  it("should contain gravity and terrain correct values & double check request", () => {
    let firstResponseBody;

    cy.request({
      method: "GET",
      url: firstPlanetUrl
    }).then(response => {
      expect(response.status).to.equal(200)
      
      cy.fixture("planetDetails").then(planetDetails => {
        expect(response.body.gravity).to.equal(planetDetails.gravity)
        expect(response.body.terrain).to.equal(planetDetails.terrain)
      })

      firstResponseBody = response.body
      
      cy.request({
        method: "GET",
        url: response.body.url
      })

    }).then(secondResponse => {
      expect(secondResponse.status).to.equal(200)
      expect(secondResponse.body).to.deep.equal(firstResponseBody)
    })
  });

  it("should return 404 status for non existing film", () => {
    cy.request({
      method: "GET",
      url: "/films/7",
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.equal(404)
    })
  });
})