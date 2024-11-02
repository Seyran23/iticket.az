const yaml = require('yamljs');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const UserSchema = require("./schemas/UserSchema"); 
const AuthResponseSchema = require('./schemas/AuthResponse');
const EventSchema = require('./schemas/EventSchema');
const CategorySchema = require('./schemas/CategorySchema');
const TicketSchema = require('./schemas/TicketSchema');
const GeneralSettingsSchema = require('./schemas/GeneralSettingsSchema');
const SliderSchema = require('./schemas/SliderSchema');




// Load Swagger YAML file
const templatePath = path.join(__dirname, 'swagger.template.yaml');

const templateContent = fs.readFileSync(templatePath, 'utf8');

const swaggerContent = templateContent.replace(/\${(\w+)}/g, (_, key) => process.env[key] || '');

const swaggerDocument = yaml.parse(swaggerContent);


// Inject custom schemas into the Swagger document
swaggerDocument.components.schemas = {
  ...swaggerDocument.components.schemas,
  ...UserSchema,
  ...AuthResponseSchema,
  ...EventSchema,
  ...CategorySchema,
  ...TicketSchema,
  ...GeneralSettingsSchema,
  ...SliderSchema,
};

module.exports = swaggerDocument;
