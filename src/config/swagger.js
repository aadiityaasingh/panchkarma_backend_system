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
        url: "http://localhost:3000",
        description: "Local server"
      },
      {
        url: "https://panchakarma-backend-system.onrender.com",
        description: "Production server"
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
    "./src/routes/*.js",
    "./src/controllers/*.js"
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;