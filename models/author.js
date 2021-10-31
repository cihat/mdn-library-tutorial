const mongoose = require("mongoose")
const { DateTime } = require("luxon");

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 1
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 1
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
})

//* Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return `${this.family_name}, ${this.first_name}`
})

//* Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  let lifetime_string = ""
  if (this.date_of_birth) {
    lifetime_string += DateTime.fromJSDate(this.date_of_birth).toLocalString(DateTime.DATE_MED)
  }

  lifetime_string += ' - '
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
  }
  return lifetime_string
})

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : ""
})

AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ""
})

//* Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
})

module.exports = mongoose.model("Author", AuthorSchema)