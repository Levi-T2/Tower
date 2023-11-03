import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 35 },
        description: { type: String, required: true, maxLength: 900 },
        coverImg: { type: String, required: true, maxLength: 450 },
        location: { type: String, required: true, maxLength: 50 },
        capacity: { type: Number, required: true, min: 0, max: 1000000000 },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        startDate: { type: Date, required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    })

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})