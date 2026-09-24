const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(
  path.join(__dirname, "openapi.yaml")
);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true, // keeps token saved
      },
      customSiteTitle: "Boutique API Docs",
    })
  );
};

module.exports = setupSwagger;
