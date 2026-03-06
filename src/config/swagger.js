const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Panchakarma Management API",
      version: "1.0.0",
      description: "Backend API documentation for Panchakarma Management System"
    },
    servers: [
      {
        url: "https://panchakarma-backend-system.onrender.com"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    "src/routes/*.js",
    "src/controllers/*.js",
    "src/app.js"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;