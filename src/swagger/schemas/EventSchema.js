const EventSchema = {
  Event: {
    type: "object",
    required: ["title", "date", "location", "price"],
    properties: {
      title: {
        type: "string",
        description: "Title of the event",
        example: "Annual Conference",
      },
      description: {
        type: "string",
        description: "Description of the event",
        example:
          "Join us for our annual conference featuring keynote speakers.",
      },
      date: {
        type: "string",
        format: "date-time",
        description: "Date and time of the event",
        example: "2023-12-31T18:30:00.000Z",
      },
      location: {
        type: "string",
        description: "Location where the event is held",
        example: "123 Event Venue, City",
      },
      price: {
        type: "number",
        description: "Price to attend the event",
        example: 49.99,
      },
      categories: {
        type: "array",
        items: {
          type: "string",
          description: "ID of the category associated with the event",
          example: "605c72efc2b4d731e41f3f9a",
        },
      },
    },
  },
};

module.exports = EventSchema;
