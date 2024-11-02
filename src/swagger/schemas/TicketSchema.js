const TicketSchema = {
  Ticket: {
    type: "object",
    required: ["userId", "eventId", "quantity", "totalPrice"],
    properties: {
      userId: {
        type: "string",
        description: "The ID of the user who purchased the ticket",
        example: "605c72efc2b4d731e41f3f8e",
      },
      eventId: {
        type: "string",
        description: "The ID of the event the ticket is for",
        example: "605c72efc2b4d731e41f3f9a",
      },
      quantity: {
        type: "integer",
        description: "The number of tickets purchased",
        example: 2,
      },
      totalPrice: {
        type: "number",
        description: "The total price of the tickets",
        example: 100.0,
      },
      status: {
        type: "string",
        description: "The status of the ticket",
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  },
};

module.exports = TicketSchema;
